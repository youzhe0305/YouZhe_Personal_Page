"""Fetch my Google Scholar profile and write citation counts to data/scholar.json.

Run daily by .github/workflows/scholar.yml; index.html reads the JSON.
The file is only rewritten when a number actually changed, and is left
untouched if Scholar blocks the request, so the page keeps the last good data.
"""
import json
import pathlib
import sys
from datetime import datetime, timezone

from scholarly import scholarly

SCHOLAR_ID = "DHDR6DAAAAAJ"
OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "scholar.json"


def fetch():
    author = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(author, sections=["basics", "indices", "publications"])
    pubs = [
        {
            "title": p["bib"].get("title", ""),
            "year": p["bib"].get("pub_year", ""),
            "citations": p.get("num_citations", 0),
            "id": p.get("author_pub_id", ""),
        }
        for p in author.get("publications", [])
    ]
    pubs.sort(key=lambda p: (-p["citations"], p["title"]))
    return {
        "citations": author.get("citedby", 0),
        "h_index": author.get("hindex", 0),
        "i10_index": author.get("i10index", 0),
        "publications": pubs,
    }


def main():
    try:
        data = fetch()
    except Exception as e:  # Scholar often rate-limits CI machines; keep the old file
        print(f"Could not fetch Scholar profile: {e!r}", file=sys.stderr)
        sys.exit(1)
    if not data["publications"]:
        print("Scholar returned no publications; keeping the old file", file=sys.stderr)
        sys.exit(1)

    old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    old.pop("updated", None)
    if old == data:
        print("No change")
        return

    data["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated: {data['citations']} citations, h-index {data['h_index']}")


if __name__ == "__main__":
    main()
