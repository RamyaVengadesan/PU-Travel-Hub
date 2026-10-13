# FastAPI proxy for Google Places photos and live ratings.
# Run: pip install -r requirements.txt ; set GOOGLE_API_KEY ; uvicorn main:app --reload
# Enable "Places API (New)" in Google Cloud, restrict the key, and keep Google attribution (the cards link to Google Maps).
import os, httpx
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

KEY = os.environ["GOOGLE_API_KEY"]
BASE = "https://places.googleapis.com/v1"
app = FastAPI()
# Set ALLOWED_ORIGINS="https://your-site.com" in production; "*" is for local testing only.
ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=ORIGINS, allow_methods=["GET"])
_info, _photo = {}, {}

async def details(pid: str):
    if pid not in _info:
        async with httpx.AsyncClient(timeout=15) as c:
            r = await c.get(f"{BASE}/places/{pid}", headers={"X-Goog-Api-Key": KEY,
                "X-Goog-FieldMask": "rating,userRatingCount,photos"})
        if r.status_code != 200:
            raise HTTPException(r.status_code, "Places API error")
        _info[pid] = r.json()
    return _info[pid]

@app.get("/api/place/{pid}")
async def place(pid: str):
    d = await details(pid)
    return {"rating": d.get("rating"), "count": d.get("userRatingCount", 0)}

@app.get("/api/photo/{pid}")
async def photo(pid: str):
    if pid not in _photo:
        d = await details(pid)
        photos = d.get("photos") or []
        if not photos:
            raise HTTPException(404, "No photo")
        async with httpx.AsyncClient(timeout=20, follow_redirects=True) as c:
            r = await c.get(f"{BASE}/{photos[0]['name']}/media", params={"maxWidthPx": 800, "key": KEY})
        _photo[pid] = (r.content, r.headers.get("content-type", "image/jpeg"))
    body, ctype = _photo[pid]
    return Response(body, media_type=ctype, headers={"Cache-Control": "public, max-age=86400"})
