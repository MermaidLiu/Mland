#!/usr/bin/env python3
"""MedSkill CLI wrapper for nature-academic-search MCP tools."""

from __future__ import annotations

import json
import sys
from pathlib import Path

# Upstream MCP server modules
sys.path.insert(0, "/app/upstream/mcp-server")

from academic_search_server import (  # noqa: E402
    get_citation,
    get_paper_by_id,
    lookup_mesh,
    search_papers,
)


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: run_skill.py <params.json> <output.json>", file=sys.stderr)
        sys.exit(1)

    params_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    params = json.loads(params_path.read_text(encoding="utf-8"))
    action = params.get("action", "search_papers")

    if action == "search_papers":
        result = search_papers(
            query=params["query"],
            sources=params.get("sources"),
            rows=params.get("rows", 5),
            type=params.get("type"),
        )
    elif action == "get_paper_by_id":
        result = get_paper_by_id(
            id=params["id"],
            id_type=params.get("id_type", "auto"),
        )
    elif action == "get_citation":
        result = get_citation(
            id=params["id"],
            id_type=params.get("id_type", "auto"),
            style=params.get("style", "apa"),
        )
    elif action == "lookup_mesh":
        result = lookup_mesh(term=params["term"])
    else:
        result = json.dumps(
            {
                "error": f"Unknown action: {action}",
                "supported": [
                    "search_papers",
                    "get_paper_by_id",
                    "get_citation",
                    "lookup_mesh",
                ],
            },
            ensure_ascii=False,
        )

    # Upstream tools return JSON strings — normalize to object for output file
    try:
        payload = json.loads(result)
    except json.JSONDecodeError:
        payload = {"raw": result}

    output_path.write_text(
        json.dumps(
            {
                "skill": "nature-academic-search",
                "action": action,
                "params": params,
                "result": payload,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
