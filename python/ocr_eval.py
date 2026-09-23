"""Score OCR predictions from ocr_run.py against the benchmark's ground-truth markdown.

Runs on CPU, no model needed. Ground truth is the dataset's `true_markdown_output`.

Metrics (per document, then averaged):
  similarity   1 - normalized Levenshtein distance on text     (higher is better)
  cer          character error rate                            (lower is better)
  wer          word error rate                                 (lower is better)
  table_f1     token F1 over table cells (TABLE-like docs only) (higher is better)

Both texts are normalized first (markdown syntax, bold/italic, table pipes and
whitespace removed) so the score reflects recognised content rather than
formatting choices. Use --raw to skip normalization.

Usage:
    python ocr_eval.py
    python ocr_eval.py --raw
"""

import argparse
import json
import re
from pathlib import Path

import pandas as pd
from datasets import load_dataset
from rapidfuzz.distance import Levenshtein

DATASET = "getomni-ai/ocr-benchmark"
OUT_DIR = Path(__file__).parent / "ocr_results"
PREDICTIONS = OUT_DIR / "predictions.jsonl"
SCORES_CSV = OUT_DIR / "scores.csv"


def normalize(text: str) -> str:
    text = re.sub(r"^\s*\|?[\s:|-]+\|[\s:|-]*$", " ", text, flags=re.MULTILINE)  # table separator rows
    text = re.sub(r"!\[.*?\]\(.*?\)", " ", text)  # images
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # links -> label
    text = re.sub(r"^\s{0,3}#{1,6}\s*", "", text, flags=re.MULTILINE)  # headings
    text = re.sub(r"<[^>]+>", " ", text)  # html tags (tables, br)
    text = re.sub(r"[*_`~|>]", " ", text)  # emphasis, pipes, quotes
    return re.sub(r"\s+", " ", text).strip().lower()


def cell_tokens(text: str) -> list[str]:
    return normalize(text).split()


def token_f1(pred: list[str], ref: list[str]) -> float:
    if not pred or not ref:
        return float(pred == ref)
    from collections import Counter

    common = sum((Counter(pred) & Counter(ref)).values())
    if common == 0:
        return 0.0
    p, r = common / len(pred), common / len(ref)
    return 2 * p * r / (p + r)


def score(pred: str, ref: str) -> dict:
    ch = max(len(ref), 1)
    pw, rw = pred.split(), ref.split()
    return {
        "similarity": 1 - Levenshtein.normalized_distance(pred, ref),
        "cer": min(Levenshtein.distance(pred, ref) / ch, 1.0),
        "wer": min(Levenshtein.distance(pw, rw) / max(len(rw), 1), 1.0),
        "token_f1": token_f1(pw, rw),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--raw", action="store_true", help="skip text normalization")
    args = parser.parse_args()

    with PREDICTIONS.open(encoding="utf-8") as f:
        preds = {r["id"]: r for r in map(json.loads, filter(str.strip, f))}

    ds = load_dataset(DATASET, split="test").remove_columns(["image"])
    rows = []
    for rec in ds:
        if rec["id"] not in preds:
            continue
        p = preds[rec["id"]]
        meta = json.loads(rec["metadata"])
        pred, ref = p["prediction"], rec["true_markdown_output"]
        if not args.raw:
            pred, ref = normalize(pred), normalize(ref)
        rows.append(
            {
                "id": rec["id"],
                "format": meta.get("format", "").strip().upper(),
                "document_quality": meta.get("documentQuality", "").strip().upper(),
                "failed": bool(p["error"]),
                "pred_chars": len(pred),
                "ref_chars": len(ref),
                **score(pred, ref),
            }
        )

    df = pd.DataFrame(rows)
    OUT_DIR.mkdir(exist_ok=True)
    df.to_csv(SCORES_CSV, index=False)

    metrics = ["similarity", "cer", "wer", "token_f1"]
    print(f"\n{len(df)} documents scored ({df['failed'].sum()} inference failures)\n")
    print("OVERALL (mean / median)")
    for m in metrics:
        print(f"  {m:<11} {df[m].mean():.3f} / {df[m].median():.3f}")

    for col in ("document_quality", "format"):
        g = df.groupby(col)[metrics].mean().round(3)
        g.insert(0, "n", df.groupby(col).size())
        print(f"\nBY {col.upper()}")
        print(g.sort_values("similarity").to_string())

    print("\nWORST 10 (by similarity)")
    print(df.nsmallest(10, "similarity")[["id", "format", "document_quality", "similarity", "cer"]].to_string(index=False))
    print(f"\nPer-document scores: {SCORES_CSV}")


if __name__ == "__main__":
    main()
