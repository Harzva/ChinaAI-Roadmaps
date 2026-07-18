#!/usr/bin/env python3
"""Inspect an arXiv PDF and emit evidence metadata without publishing full paper text."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


METRIC_PATTERN = re.compile(
    r"\b(?:accuracy|success rate|SR|SSR|SRec|SPL|pass@\d+|win rate|F1|TSR|CR|FR)\b",
    re.IGNORECASE,
)
TABLE_PATTERN = re.compile(r"\b(?:Table|TABLE)\s+([A-Z]?\.?\d+(?:\.\d+)?)", re.IGNORECASE)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--paper-id", required=True)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--render-dir", type=Path)
    parser.add_argument("--ocr-fallback", action="store_true")
    parser.add_argument("--max-pages", type=int, default=200)
    parser.add_argument("--max-bytes", type=int, default=120 * 1024 * 1024)
    return parser.parse_args()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return f"sha256:{digest.hexdigest()}"


def dereference(value):
    return value.get_object() if hasattr(value, "get_object") else value


def action_contains_javascript(value, seen=None) -> bool:
    seen = seen or set()
    value = dereference(value)
    if not hasattr(value, "get"):
        return False
    identity = id(value)
    if identity in seen:
        return False
    seen.add(identity)
    if str(value.get("/S", "")) == "/JavaScript" or value.get("/JS") is not None:
        return True
    return any(action_contains_javascript(child, seen) for child in value.values() if child is not value)


def security_flags(reader: PdfReader) -> dict:
    root = dereference(reader.trailer.get("/Root", {}))
    names = dereference(root.get("/Names", {})) if hasattr(root, "get") else {}
    javascript_tree = names.get("/JavaScript") if hasattr(names, "get") else None
    open_action = root.get("/OpenAction") if hasattr(root, "get") else None
    additional_actions = root.get("/AA") if hasattr(root, "get") else None
    embedded_files = names.get("/EmbeddedFiles") if hasattr(names, "get") else None
    return {
        "javascript": bool(javascript_tree) or action_contains_javascript(open_action) or action_contains_javascript(additional_actions),
        "openAction": open_action is not None,
        "additionalActions": additional_actions is not None,
        "embeddedFiles": embedded_files is not None,
    }


def short_excerpt(text: str, limit: int = 320) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip()
    return cleaned[:limit]


def render_page(pdf: Path, page_number: int, render_dir: Path) -> str | None:
    pdftoppm = shutil.which("pdftoppm")
    if not pdftoppm:
        return None
    render_dir.mkdir(parents=True, exist_ok=True)
    prefix = render_dir / f"page-{page_number:03d}"
    subprocess.run(
        [pdftoppm, "-f", str(page_number), "-l", str(page_number), "-r", "200", "-png", str(pdf), str(prefix)],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    files = sorted(render_dir.glob(f"{prefix.name}-*.png"))
    return files[0].name if files else None


def ocr_page(image: Path) -> dict | None:
    tesseract = shutil.which("tesseract")
    if not tesseract:
        return None
    completed = subprocess.run(
        [tesseract, image.name, "stdout", "-l", "eng", "--psm", "3"],
        cwd=image.parent,
        check=True,
        text=True,
        capture_output=True,
    )
    text = completed.stdout
    return {"characters": len(text), "textSha256": f"sha256:{hashlib.sha256(text.encode()).hexdigest()}", "excerpt": short_excerpt(text)}


def main() -> None:
    options = parse_args()
    pdf = options.pdf.resolve()
    if not pdf.is_file():
        raise SystemExit(f"PDF not found: {pdf}")
    size = pdf.stat().st_size
    if size > options.max_bytes:
        raise SystemExit(f"PDF exceeds {options.max_bytes} bytes")
    if pdf.read_bytes()[:5] != b"%PDF-":
        raise SystemExit("File does not start with the PDF signature")

    reader = PdfReader(str(pdf), strict=True)
    if reader.is_encrypted:
        raise SystemExit("Encrypted PDFs are not accepted")
    page_count = len(reader.pages)
    if page_count > options.max_pages:
        raise SystemExit(f"PDF exceeds {options.max_pages} pages")

    page_records = []
    candidate_pages = []
    with pdfplumber.open(pdf) as document:
        for page_number, page in enumerate(document.pages, 1):
            text = page.extract_text() or ""
            captions = [f"Table {match.group(1)}" for match in TABLE_PATTERN.finditer(text)]
            metrics = sorted({match.group(0) for match in METRIC_PATTERN.finditer(text)}, key=str.lower)
            record = {
                "page": page_number,
                "characters": len(text),
                "textSha256": f"sha256:{hashlib.sha256(text.encode()).hexdigest()}",
                "captions": captions,
                "metrics": metrics,
            }
            if captions or metrics:
                record["excerpt"] = short_excerpt(text)
                candidate_pages.append(page_number)
            page_records.append(record)

    rendered = []
    render_dir = options.render_dir.resolve() if options.render_dir else None
    if render_dir:
        for page_number in candidate_pages:
            image_name = render_page(pdf, page_number, render_dir)
            if not image_name:
                continue
            item = {"page": page_number, "image": image_name}
            if options.ocr_fallback and page_records[page_number - 1]["characters"] < 40:
                item["ocr"] = ocr_page(render_dir / image_name)
            rendered.append(item)

    output = {
        "schemaVersion": "1.0.0",
        "paperId": options.paper_id,
        "pdfSha256": sha256(pdf),
        "bytes": size,
        "pageCount": page_count,
        "encrypted": False,
        "security": security_flags(reader),
        "textLayer": "usable" if sum(page["characters"] for page in page_records) >= page_count * 80 else "partial",
        "candidatePages": candidate_pages,
        "pages": page_records,
        "rendered": rendered,
        "limitations": [
            "Captions and metric words locate evidence pages; they do not prove table-cell accuracy.",
            "OCR output is never ranking eligible without visual and human review.",
        ],
    }
    options.out.parent.mkdir(parents=True, exist_ok=True)
    options.out.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Inspected {options.paper_id}: {page_count} pages, {len(candidate_pages)} evidence page(s), {output['textLayer']} text layer")


if __name__ == "__main__":
    main()
