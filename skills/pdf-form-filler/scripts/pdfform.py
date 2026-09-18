#!/usr/bin/env python3
"""pdfform.py - inspect and fill PDF forms (PyMuPDF/fitz).

Supports two kinds of PDFs:
  - AcroForm PDFs with real fillable widgets (fill by field name)
  - Flat PDFs (label text + blank underscore lines + box glyphs) where values
    are overlaid at coordinates anchored off the label text

Subcommands
  inspect  PDF [--page N]              summary: pages, sizes, widget?/checkbox counts
  widgets  PDF [--page N]              list AcroForm fields (name, type, value, rect)
  search   PDF "text" [--page N]       rects of every occurrence of text
  region   PDF X0 Y0 X1 Y1 [--page N]  every word (with coords) inside a box
  crop     PDF X0 Y0 X1 Y1 OUT.png     render a region to PNG for visual verification
  fill     --in PDF --out PDF --placements P.json    write a filled copy

placements.json schema:
  {
    "mode": "overlay" | "widgets",
    "color": [0, 0, 0.55],          # optional, default dark blue ink
    "default_size": 9,               # optional
    "page": 0,                       # optional default page for text/checks
    "text":   [{"page":0,"x":118,"y":93,"t":"Mellonhead","size":9}],
    "checks": [{"page":0,"x":18.7,"y":596,"size":9}],   # X marks for checkboxes
    "widgets": {"Company Name": "Mellonhead", "Agree": true}   # widgets mode
  }

Install: pip3 install --break-system-packages pymupdf
"""
import sys, json, argparse


def _fitz():
    try:
        import fitz  # noqa
        return fitz
    except ImportError:
        sys.exit("PyMuPDF not installed. Run: pip3 install --break-system-packages pymupdf")


def cmd_inspect(a):
    fitz = _fitz()
    doc = fitz.open(a.pdf)
    pages = [a.page] if a.page is not None else range(len(doc))
    out = {"path": a.pdf, "pages": len(doc), "has_widgets": False, "page_info": []}
    boxes = {"■", "□", "❑", "☐", "☑", "✔", "✗"}
    for pno in pages:
        p = doc[pno]
        widgets = list(p.widgets() or [])
        if widgets:
            out["has_widgets"] = True
        cb = sum(1 for w in p.get_text("words") if w[4] in boxes)
        out["page_info"].append({
            "page": pno,
            "size": [round(p.rect.width, 1), round(p.rect.height, 1)],
            "widget_count": len(widgets),
            "checkbox_glyphs": cb,
        })
    print(json.dumps(out, indent=2, ensure_ascii=False))


def cmd_widgets(a):
    fitz = _fitz()
    doc = fitz.open(a.pdf)
    pages = [a.page] if a.page is not None else range(len(doc))
    rows = []
    for pno in pages:
        for w in (doc[pno].widgets() or []):
            rows.append({
                "page": pno,
                "name": w.field_name,
                "type": w.field_type_string,
                "value": w.field_value,
                "rect": [round(c, 1) for c in w.rect],
            })
    print(json.dumps(rows, indent=2, ensure_ascii=False))


def cmd_search(a):
    fitz = _fitz()
    doc = fitz.open(a.pdf)
    pages = [a.page] if a.page is not None else range(len(doc))
    for pno in pages:
        for r in doc[pno].search_for(a.text):
            print(f"page={pno} x0={r.x0:.1f} y0={r.y0:.1f} x1={r.x1:.1f} y1={r.y1:.1f}")


def cmd_region(a):
    fitz = _fitz()
    doc = fitz.open(a.pdf)
    pno = a.page or 0
    rows = {}
    for w in doc[pno].get_text("words"):
        x0, y0, x1, y1, word = w[0], w[1], w[2], w[3], w[4]
        if a.x0 <= x0 and x1 <= a.x1 and a.y0 <= y0 and y1 <= a.y1:
            rows.setdefault(round(y0, 1), []).append((round(x0, 1), round(x1, 1), word))
    for y in sorted(rows):
        toks = sorted(rows[y])
        print(f"y0={y}  " + "  ".join(f"[{x0}-{x1}]{t}" for x0, x1, t in toks))


def cmd_crop(a):
    fitz = _fitz()
    doc = fitz.open(a.pdf)
    pno = a.page or 0
    clip = fitz.Rect(a.x0, a.y0, a.x1, a.y1)
    doc[pno].get_pixmap(dpi=a.dpi, clip=clip).save(a.out)
    print(f"wrote {a.out}")


def cmd_fill(a):
    fitz = _fitz()
    with open(a.placements) as f:
        spec = json.load(f)
    doc = fitz.open(a.inp)
    mode = spec.get("mode", "overlay")

    if mode == "widgets":
        wanted = spec.get("widgets", {})
        hit = set()
        for pno in range(len(doc)):
            for w in (doc[pno].widgets() or []):
                if w.field_name in wanted:
                    val = wanted[w.field_name]
                    if w.field_type_string in ("CheckBox",):
                        w.field_value = bool(val)
                    else:
                        w.field_value = str(val)
                    w.update()
                    hit.add(w.field_name)
        missing = set(wanted) - hit
        if missing:
            print("WARNING: field names not found: " + ", ".join(sorted(missing)), file=sys.stderr)
    else:  # overlay
        color = tuple(spec.get("color", [0, 0, 0.55]))
        dsize = spec.get("default_size", 9)
        dpage = spec.get("page", 0)
        for item in spec.get("text", []):
            p = doc[item.get("page", dpage)]
            p.insert_text((item["x"], item["y"]), str(item["t"]),
                          fontsize=item.get("size", dsize), fontname="helv", color=color)
        for ck in spec.get("checks", []):
            p = doc[ck.get("page", dpage)]
            p.insert_text((ck["x"], ck["y"]), "X",
                          fontsize=ck.get("size", dsize), fontname="helv", color=color)

    doc.save(a.out)
    print(f"wrote {a.out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("inspect"); s.add_argument("pdf"); s.add_argument("--page", type=int); s.set_defaults(fn=cmd_inspect)
    s = sub.add_parser("widgets"); s.add_argument("pdf"); s.add_argument("--page", type=int); s.set_defaults(fn=cmd_widgets)
    s = sub.add_parser("search"); s.add_argument("pdf"); s.add_argument("text"); s.add_argument("--page", type=int); s.set_defaults(fn=cmd_search)
    s = sub.add_parser("region"); s.add_argument("pdf"); s.add_argument("x0", type=float); s.add_argument("y0", type=float); s.add_argument("x1", type=float); s.add_argument("y1", type=float); s.add_argument("--page", type=int); s.set_defaults(fn=cmd_region)
    s = sub.add_parser("crop"); s.add_argument("pdf"); s.add_argument("x0", type=float); s.add_argument("y0", type=float); s.add_argument("x1", type=float); s.add_argument("y1", type=float); s.add_argument("out"); s.add_argument("--page", type=int); s.add_argument("--dpi", type=int, default=220); s.set_defaults(fn=cmd_crop)
    s = sub.add_parser("fill"); s.add_argument("--in", dest="inp", required=True); s.add_argument("--out", required=True); s.add_argument("--placements", required=True); s.set_defaults(fn=cmd_fill)

    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
