#!/usr/bin/env bash
# MedSkill 统一入口 — 读 /data/params.json，写 /data/output/result.json
set -euo pipefail

PARAMS="${1:-/data/params.json}"
OUT="${2:-/data/output/result.json}"

mkdir -p "$(dirname "$OUT")"

if [[ ! -f "$PARAMS" ]]; then
  echo "Missing params file: $PARAMS" >&2
  echo 'Example: {"action":"search_papers","query":"survival analysis","rows":5}' >&2
  exit 1
fi

python3 /app/cli/run_skill.py "$PARAMS" "$OUT"
echo "Wrote result to $OUT"
