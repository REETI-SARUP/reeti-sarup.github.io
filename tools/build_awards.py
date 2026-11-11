"""Redact award amounts from Spotlight screenshots and emit gallery metadata.
Input: Vision OCR json + source screenshots. Output: webp images + awards.json (no amounts)."""
import json, re, sys, os
from PIL import Image, ImageDraw
OCR, SRC, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT + "/full", exist_ok=True); os.makedirs(OUT + "/thumb", exist_ok=True)
data = json.load(open(OCR))
MONEY = re.compile(r"(?i)([il1]nr|usd|rs\.?|₹|\$)\s*[\d,.]+|^[\d,]{3,7}$")
EXCLUDE = re.compile(r"(?i)@|betterworks|bookmarks|workhuman\.com|chrome|mailbox|check-in|find a colleague")
VALUES = ["Deliver Awesome","Win Together","Be Passionate","Customer Obsession","Stronger Together","Courage","Integrity Without Compromise","We Care and Give Back"]
DATE = re.compile(r"(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}")
MONTHS = {m:i+1 for i,m in enumerate("January February March April May June July August September October November December".split())}
items = []
for e in data:
    lines = e["lines"]; texts = [l["t"] for l in lines]; blob = " | ".join(texts)
    giver = next((re.sub(r"\s*(Spotlighted|recognized).*","",t).strip(" ,") for t in texts if re.search(r"Spotlighted you|recognized You", t)), None)
    m = DATE.search(blob)
    kind = None
    if giver and m: kind = "spotlight"
    elif "FY23 Q4 - Customer Obsession Winners" in blob: kind = "winners"
    elif "5 Year Milestone" in blob: kind = "milestone"
    elif re.search(r"(?i)kudoboard", blob): kind = "kudoboard"
    if not kind or (kind != "milestone" and EXCLUDE.search(blob)) : continue
    if kind == "milestone" and re.search(r"(?i)workhuman\.com|bookmarks", blob): continue
    img = Image.open(f"{SRC}/{e['file']}").convert("RGB"); W, H = img.size; d = ImageDraw.Draw(img)
    redacted = 0; money_marks = 0
    for i, l in enumerate(lines):
        t = l["t"]
        hit = MONEY.search(t)
        if not hit and re.fullmatch(r"(?i)[il1]nr", t.strip()): hit = True
        if hit:
            x0 = max(0, int((l["x"]) * W) - 10); x1 = min(W, int((l["x"] + l["w"]) * W) + 10)
            y0 = max(0, int(l["y"] * H) - 6); y1 = min(H, int((l["y"] + l["h"]) * H) + 6)
            # if the line also contains an award-type label, keep label side: cover only from 'INR' onward
            mm = re.search(r"(?i)([il1]nr|usd|rs\.?|₹|\$)\s*[\d,.]+", t)
            if mm and mm.start() > 0 and len(t) > 0:
                x0 = max(0, int((l["x"] + l["w"] * mm.start() / len(t)) * W) - 10)
            samp = img.getpixel((max(0, x0 - 4), (y0 + y1) // 2))
            d.rectangle([x0, y0, x1, y1], fill=samp); redacted += 1
    if kind in ("spotlight",) and not redacted: print("WARN no amount found", e["file"])
    sc = min(1.0, 1400 / W); full = img.resize((int(W * sc), int(H * sc)), Image.LANCZOS) if sc < 1 else img
    idx = len(items) + 1; name = f"{idx:03d}.webp"
    full.save(f"{OUT}/full/{name}", "webp", quality=80, method=6)
    th = img.copy(); th.thumbnail((640, 640)); th.save(f"{OUT}/thumb/{name}", "webp", quality=74, method=6)
    amt = None
    for t in texts:
        mm = re.search(r"[\d,]{4,7}", t) if re.search(r"(?i)[il1]nr", t) else None
        if mm: amt = int(mm.group(0).replace(",","")); break
    value = next((v for v in VALUES if v in blob), None)
    date = m.group(0) if m else None
    iso = None
    if date:
        mo, dd, yy = re.match(r"(\w+) (\d+), (\d+)", date).groups(); iso = f"{yy}-{MONTHS[mo]:02d}-{int(dd):02d}"
    after = blob.split(date, 1)[1] if date else blob
    after = re.sub(r"\s*\|\s*(Private|Encore|Salute|Bravo)[^|]*\|?", " | ", after)
    after = re.sub(r"(?i)[^|]*[il1]nr\s*[\d,]+[^|]*\|?", "", after)
    parts = [p.strip() for p in after.split("|") if p.strip() and not re.match(r"(?i)^(x|rs,?|\d)$", p.strip())]
    items.append({"id": idx, "file": name, "kind": kind, "giver": giver, "value": value, "date": iso, "year": int(iso[:4]) if iso else int(e["file"].split("/")[0]),
                  "src": e["file"], "text": " ".join(parts)[:420], "_amt": amt})
json.dump(items, open(OUT + "/awards_raw.json", "w"), indent=1)
print(len(items), "items")
