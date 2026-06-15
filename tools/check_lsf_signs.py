#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_lsf_signs.py — Claude Code PostToolUse guardrail for LSF hand signs.

Wired into .claude/settings.json as a PostToolUse hook on Write|Edit. After
any change to lsf-data.js it checks that every hand sign is a traced REAL hand
image (an <img src="data:image/png..."> produced by tools/trace_lsf_signs.py)
rather than a hand-built geometric SVG (<rect>/<circle>/ad-hoc <path>), which
users have repeatedly rejected as "not resembling human hands".

It never blocks an edit — it only surfaces a reminder so future signs are
drawn the agreed way. Stdlib only, so it runs in any environment.

Reads the PostToolUse event JSON on stdin; emits hook JSON on stdout.
"""

import json
import os
import re
import sys


def main():
    try:
        event = json.load(sys.stdin)
    except Exception:
        return  # nothing to do if we can't parse the event

    tool_input = event.get("tool_input", {}) or {}
    path = tool_input.get("file_path") or tool_input.get("path") or ""
    if os.path.basename(path) != "lsf-data.js":
        return

    try:
        content = open(path, encoding="utf-8").read()
    except OSError:
        return

    # Isolate each `visual:` field and look for geometric (non-image) hand art.
    # A real sign looks like: <img src="data:image/png;base64,...">
    # A rejected sign looks like an inline <svg>...<rect/<circle/<path...></svg>.
    offenders = []
    for m in re.finditer(r"visual:\s*'", content):
        # crude span: from this visual to the next field/newline-ish boundary
        start = m.end()
        # find the closing quote that ends the value (single quotes are escaped
        # out of generated HTML, so the next unescaped ' ends it)
        end = content.find("',", start)
        chunk = content[start:end if end != -1 else start + 8000]
        svg_blocks = re.findall(r"<svg\b.*?</svg>", chunk, re.DOTALL)
        for blk in svg_blocks:
            if re.search(r"<(rect|circle|ellipse|polygon)\b", blk) or \
               (blk.count("<path") > 0 and "data:image" not in blk):
                # geometric primitives = hand-built, not traced
                line_no = content.count("\n", 0, m.start()) + 1
                offenders.append(line_no)
                break

    if not offenders:
        return  # all signs are traced images — silent success

    lines = ", ".join("L%d" % n for n in sorted(set(offenders)))
    msg = (
        "LSF sign guardrail: geometric (non-image) hand SVGs remain in "
        "lsf-data.js at visual field(s) %s. Hand signs must be REAL hands "
        "traced via tools/trace_lsf_signs.py and embedded as "
        "<img src=\"data:image/png;base64,...\">, not built from "
        "<rect>/<circle>/<path>. See tools/trace_lsf_signs.py for the pipeline."
        % lines
    )
    print(json.dumps({
        "systemMessage": msg,
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": msg,
        },
    }))


if __name__ == "__main__":
    main()
