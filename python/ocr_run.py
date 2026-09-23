"""Run baidu/Unlimited-OCR over the OmniAI OCR Benchmark and save predictions.

Needs an NVIDIA GPU with CUDA (Colab T4 or better). Resumable: ids already in the
output file are skipped, so you can re-run after a disconnect.

Usage:
    python ocr_run.py --limit 20                # quick smoke test
    python ocr_run.py                           # all 1000 documents
    python ocr_run.py --limit 200 --seed 1
"""

import argparse
import json
import re
import tempfile
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModel, AutoTokenizer

MODEL_NAME = "baidu/Unlimited-OCR"
DATASET = "getomni-ai/ocr-benchmark"
OUT_DIR = Path(__file__).parent / "ocr_results"
PREDICTIONS = OUT_DIR / "predictions.jsonl"

# Grounding tags the model emits around layout regions, e.g. <|ref|>text<|/ref|><|det|>[[..]]<|/det|>
TAG_RE = re.compile(r"<\|ref\|>.*?<\|/ref\|>\s*<\|det\|>.*?<\|/det\|>", re.DOTALL)
DET_RE = re.compile(r"<\|det\|>.*?<\|/det\|>", re.DOTALL)


def clean(text: str) -> str:
    return DET_RE.sub("", TAG_RE.sub("", text)).strip()


def load_done() -> set[int]:
    if not PREDICTIONS.exists():
        return set()
    with PREDICTIONS.open(encoding="utf-8") as f:
        return {json.loads(line)["id"] for line in f if line.strip()}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=None, help="random subset size")
    parser.add_argument("--seed", type=int, default=0)
    parser.add_argument(
        "--mode",
        choices=["gundam", "base"],
        default="gundam",
        help="gundam: 640px tiles + crops; base: single 1024px image",
    )
    args = parser.parse_args()

    if not torch.cuda.is_available():
        raise SystemExit("CUDA GPU required.")

    OUT_DIR.mkdir(exist_ok=True)
    ds = load_dataset(DATASET, split="test")
    ids = list(range(len(ds)))
    if args.limit:
        ids = sorted(ds.shuffle(seed=args.seed).select(range(args.limit))["id"])
        by_id = {rid: i for i, rid in enumerate(ds["id"])}
        ids = [by_id[i] for i in ids]

    done = load_done()

    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        MODEL_NAME, trust_remote_code=True, use_safetensors=True, torch_dtype=torch.bfloat16
    )
    model = model.eval().cuda()

    size_kwargs = (
        dict(base_size=1024, image_size=640, crop_mode=True)
        if args.mode == "gundam"
        else dict(base_size=1024, image_size=1024, crop_mode=False)
    )

    with tempfile.TemporaryDirectory() as tmp, PREDICTIONS.open("a", encoding="utf-8") as out:
        for n, idx in enumerate(ids, 1):
            row = ds[idx]
            if row["id"] in done:
                continue

            img_path = Path(tmp) / f"{row['id']}.jpg"
            row["image"].convert("RGB").save(img_path)

            try:
                # eval_mode=True returns the decoded text instead of only writing files.
                raw = model.infer(
                    tokenizer,
                    prompt="<image>document parsing.",
                    image_file=str(img_path),
                    output_path=tmp,
                    max_length=32768,
                    no_repeat_ngram_size=35,
                    ngram_window=128,
                    eval_mode=True,
                    **size_kwargs,
                )
                error = None
            except Exception as e:  # keep going; failures count against the model in eval
                raw, error = "", repr(e)
                torch.cuda.empty_cache()

            out.write(
                json.dumps(
                    {"id": row["id"], "raw": raw, "prediction": clean(raw), "error": error},
                    ensure_ascii=False,
                )
                + "\n"
            )
            out.flush()
            print(f"[{n}/{len(ids)}] id={row['id']} chars={len(raw)} err={error}")


if __name__ == "__main__":
    main()
