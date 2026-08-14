#!/usr/bin/env python3
"""Refresh store-rating.json from the real Microsoft Store catalog API.

Run manually whenever you want the site's Store-rating badge and
AggregateRating structured data to reflect current reviews, then commit
the updated store-rating.json. The site only shows the badge/schema when
ratingCount > 0 (store-rating.js), so this never needs to be run more
than occasionally.

Usage: python scripts/sync_store_rating.py
"""
import json
import urllib.request
from datetime import datetime, timezone

PRODUCT_ID = "9NJFB5W8ZCSB"
URL = (
    f"https://storeedgefd.dsx.mp.microsoft.com/v9.0/products/{PRODUCT_ID}"
    "?market=US&locale=en-us&deviceFamily=Windows.Desktop"
)
OUT_PATH = "store-rating.json"


def main():
    with urllib.request.urlopen(URL, timeout=15) as resp:
        payload = json.load(resp)["Payload"]

    data = {
        "productId": PRODUCT_ID,
        "averageRating": payload.get("AverageRating", 0.0),
        "ratingCount": payload.get("RatingCount", 0),
        "lastChecked": datetime.now(timezone.utc).date().isoformat(),
    }

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(
        f"AverageRating={data['averageRating']}  "
        f"RatingCount={data['ratingCount']}  -> {OUT_PATH} updated"
    )


if __name__ == "__main__":
    main()
