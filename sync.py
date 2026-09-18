#!/usr/bin/env python3
"""Re-sync skills and agents from the private source repo, scrubbing private details.

    ./sync.py            copy + scrub + check
    ./sync.py --check    only run the residual check on the current tree

Reads sync-manifest.txt (committed) and .sync.local/ (gitignored):
    .sync.local/source        path to the private repo's .claude directory
    .sync.local/rules.tsv     <regex>\t<replacement>, applied in order to every .md/.py copied
    .sync.local/blocks.tsv    <file>\t<start marker>\t<end marker>\t<template file>
                              replaces the text from start marker up to (not including) end marker
    .sync.local/forbidden.txt one regex per line; any match after scrubbing fails the check
    .sync.local/allow.txt     one regex per line; matches are stripped before the forbidden check
"""
import pathlib, re, shutil, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent
LOCAL = ROOT / ".sync.local"
GENERIC_FORBIDDEN = [
    r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}",            # email
    r"\(?\b[0-9]{3}\)?[-. ][0-9]{3}[-. ][0-9]{4}\b",             # phone
    r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b",  # uuid
    r"\b[UDC]0[0-9A-Z]{8,10}\b",                                # slack ids
    r"/Users/[a-z]+/",                                          # local paths
    r"drive\.google\.com/[^\s)]*[A-Za-z0-9_-]{25,}",            # drive ids in urls
]
ALLOW = [r"noreply@anthropic\.com", r"\{\{[^}]*\}\}"]  # placeholders and attribution are fine


def read_tsv(name, ncols):
    p = LOCAL / name
    if not p.exists():
        return []
    rows = []
    for line in p.read_text().splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) != ncols:
            sys.exit(f"{name}: expected {ncols} tab-separated columns: {line!r}")
        rows.append(parts)
    return rows


def manifest():
    items = []
    for line in (ROOT / "sync-manifest.txt").read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            kind, name = line.split()
            items.append((kind, name))
    return items


def copy(items, source):
    targets = []
    for kind, name in items:
        if kind == "skill":
            src, dst = source / "skills" / name, ROOT / "skills" / name
            if dst.exists():
                shutil.rmtree(dst)
            shutil.copytree(src, dst, ignore=shutil.ignore_patterns(".DS_Store", "__pycache__"))
            targets += [f for f in dst.rglob("*") if f.suffix in (".md", ".py")]
        elif kind == "agent":
            src, dst = source / "agents" / f"{name}.md", ROOT / "agents" / f"{name}.md"
            shutil.copy2(src, dst)
            targets.append(dst)
        else:
            sys.exit(f"unknown manifest kind {kind!r}")
    return targets


def scrub(targets):
    blocks = read_tsv("blocks.tsv", 4)
    rules = [(re.compile(p), r) for p, r in read_tsv("rules.tsv", 2)]
    for f in targets:
        text = orig = f.read_text()
        for file, start, end, template in blocks:
            if f == ROOT / file and start in text and end in text:
                i, j = text.index(start), text.index(end)
                text = text[:i] + (LOCAL / template).read_text() + text[j:]
        for pat, rep in rules:
            text = pat.sub(rep, text)
        if text != orig:
            f.write_text(text)


def check():
    forbidden = [re.compile(p) for p in GENERIC_FORBIDDEN]
    fp = LOCAL / "forbidden.txt"
    if fp.exists():
        forbidden += [re.compile(l) for l in fp.read_text().splitlines() if l.strip() and not l.startswith("#")]
    allow = [re.compile(p) for p in ALLOW]
    ap = LOCAL / "allow.txt"
    if ap.exists():
        allow += [re.compile(l) for l in ap.read_text().splitlines() if l.strip() and not l.startswith("#")]
    hits = 0
    for d in ("skills", "agents", "commands"):
        for f in (ROOT / d).rglob("*"):
            if f.suffix not in (".md", ".py"):
                continue
            for n, line in enumerate(f.read_text().splitlines(), 1):
                probe = line
                for a in allow:
                    probe = a.sub("", probe)
                for pat in forbidden:
                    m = pat.search(probe)
                    if m:
                        hits += 1
                        print(f"  {f.relative_to(ROOT)}:{n}: {m.group(0)!r}")
                        break
    return hits


def main():
    if "--check" not in sys.argv:
        src_file = LOCAL / "source"
        if not src_file.exists():
            sys.exit(f"missing {src_file}: write the path to the private repo's .claude dir in it")
        source = pathlib.Path(src_file.read_text().strip()).expanduser()
        targets = copy(manifest(), source)
        scrub(targets)
        print(f"synced {len(targets)} files from {source}")
    print("residual check:")
    hits = check()
    if hits:
        print(f"\n{hits} line(s) still look private. Add a rule to .sync.local/rules.tsv and re-run before committing.")
        sys.exit(1)
    print("  clean")
    sys.stdout.flush()
    subprocess.run(["git", "status", "--short"], cwd=ROOT)


if __name__ == "__main__":
    main()
