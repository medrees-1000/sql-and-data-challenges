#!/usr/bin/env bash
# Daily no-op commit to keep the GitHub contribution graph green.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "$(date '+%Y-%m-%d %H:%M:%S %Z')" >> daily_log.txt

git add daily_log.txt
git commit -m "chore: daily check-in $(date '+%Y-%m-%d')"
git push
