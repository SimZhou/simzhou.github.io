#!/opt/miniforge3/bin/python
import argparse
import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS = {"x": "http://www.w3.org/1999/xhtml"}


def normalize(text: str) -> str:
    text = re.sub(r"\s+", " ", text or "")
    return text.strip()


def parse_xhtml(zf: zipfile.ZipFile, member: str):
    return ET.fromstring(zf.read(member).decode("utf-8"))


def gather_chapters(zf: zipfile.ZipFile, member: str):
    root = parse_xhtml(zf, member)
    body = root.find("x:body", NS)
    chapters = []
    current = None
    for elem in list(body):
        tag = elem.tag.split("}")[-1]
        text = normalize("".join(elem.itertext()))
        if tag == "h1":
            current = {"raw_title": text, "paragraphs": []}
            chapters.append(current)
            continue
        if tag != "p" or not current or not text:
            continue
        current["paragraphs"].append(text)
    return chapters


def build_manifest(epub_path: Path):
    with zipfile.ZipFile(epub_path) as zf:
        ship_files = [f"OEBPS/Text/Section0002_split_{index:03d}.html" for index in range(20)]
        ship_chapter_titles = [
            "THE HIGH FRONTIER",
            "FIRE IN THE SKY",
            "BETWEEN WORLDS",
            "THE ADMIRABLE BOMB",
            "THE LIGHT THAT WENT OUT",
            "KISS YOUR GIRL GOOD-BY!",
            "THE NARROW FOOTWAY",
            "A SENSE OF SPACE-TIME",
            "THE SLEEPING SPACEMEN",
            "NO RUNAWAY ROCK",
            "THE BARRIER OF DUST",
            "THE UNTOUCHABLE INGOT",
            "THE ALIEN VOICE",
            "THE SEETEE SHIP",
            "THE VANISHING ENEMY",
            "THE IRON MUSHROOMS",
            "THE FROZEN MUTINEERS",
            "COINCIDENCE",
            "A MATTER OF TIME",
            "THE WHIRLPOOL",
        ]

        ship_chapters = []
        for index, member in enumerate(ship_files, start=1):
            chapter = gather_chapters(zf, member)[0]
            ship_chapters.append(
                {
                    "number": index,
                    "source_file": member,
                    "source_heading": chapter["raw_title"],
                    "title_en": ship_chapter_titles[index - 1],
                    "paragraphs_en": chapter["paragraphs"],
                }
            )

        shock_parts = [
            "OEBPS/Text/Section0004_split_000.html",
            "OEBPS/Text/Section0004_split_001.html",
        ]
        shock_title_numbers = [
            "ONE",
            "TWO",
            "THREE",
            "FOUR",
            "FIVE",
            "SIX",
            "SEVEN",
            "EIGHT",
            "NINE",
            "TEN",
            "ELEVEN",
            "TWELVE",
            "THIRTEEN",
            "FOURTEEN",
            "FIFTEEN",
            "SIXTEEN",
            "SEVENTEEN",
            "EIGHTEEN",
            "NINETEEN",
            "TWENTY",
            "TWENTY-ONE",
            "TWENTY-TWO",
            "TWENTY-THREE",
            "TWENTY-FOUR",
            "TWENTY-FIVE",
        ]
        shock_chapters = []
        for member in shock_parts:
            shock_chapters.extend(gather_chapters(zf, member))
        shock_result = []
        for index, chapter in enumerate(shock_chapters, start=1):
            shock_result.append(
                {
                    "number": index,
                    "source_file": shock_parts[0] if index <= 12 else shock_parts[1],
                    "source_heading": chapter["raw_title"],
                    "title_en": shock_title_numbers[index - 1],
                    "paragraphs_en": chapter["paragraphs"],
                }
            )

    return {
        "source_file": str(epub_path),
        "works": [
            {
                "slug": "seetee-ship",
                "title_en": "Seetee Ship",
                "author": "Jack Williamson",
                "chapters": ship_chapters,
            },
            {
                "slug": "seetee-shock",
                "title_en": "Seetee Shock",
                "author": "Jack Williamson",
                "chapters": shock_result,
            },
        ],
    }


def main():
    parser = argparse.ArgumentParser(description="Extract the Seetee omnibus EPUB into work/chapter JSON.")
    parser.add_argument("epub", help="Path to the omnibus EPUB file")
    parser.add_argument("-o", "--output", help="Output JSON path; defaults to stdout")
    args = parser.parse_args()

    manifest = build_manifest(Path(args.epub))
    payload = json.dumps(manifest, ensure_ascii=False, indent=2)
    if args.output:
        Path(args.output).write_text(payload, encoding="utf-8")
    else:
        print(payload)


if __name__ == "__main__":
    main()

