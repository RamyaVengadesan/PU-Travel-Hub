# PU Travel Hub

A responsive travel guide to Puducherry: beaches, White Town, Auroville, temples, food, stays and ready-made itineraries. Built with plain HTML, CSS and JavaScript, with no frameworks and no build step.

**Live demo:** https://ramyavengadesan.github.io/PU-Travel-Hub/

## Features

- 148 curated places with ratings, opening hours, best time to visit and descriptions
- Category filters, search and sorting
- **My Trip** shortlist saved in the browser, with print support
- 1-day, 2-day and longer itineraries
- Budget planner with total and per-person estimate
- Best-time-to-visit guide, events calendar, travel tips and FAQ
- Google Maps directions and reviews for every place
- Responsive, keyboard-friendly, with SEO and Open Graph metadata

## Tech Stack

HTML5, CSS3, vanilla JavaScript. Optional backend in Python (FastAPI) for live Google Places photos and ratings.

## Project Structure

```text
PU-Travel-Hub/
├── index.html
├── css/styles.css        # Design system and responsive rules
├── js/
│   ├── data.js           # Places and photo library
│   ├── content.js        # Itineraries, FAQ, events, tips, costs
│   └── app.js            # Filters, dialogs, My Trip, budget planner
├── img/places/           # Bundled photos
├── backend/              # Optional FastAPI proxy
└── tools/                # Optional photo download script
```

## Getting Started

```bash
git clone https://github.com/RamyaVengadesan/PU-Travel-Hub.git
cd PU-Travel-Hub
python -m http.server 8000
```

Open http://localhost:8000, or simply open `index.html` in a browser.

## Customisation

| To change | Edit |
|---|---|
| Places, ratings, hours | `js/data.js` |
| Itineraries, FAQ, events, tips, costs | `js/content.js` |
| Colours and fonts | CSS variables at the top of `css/styles.css` |

## Optional Setup

**Offline photos:** run `python tools/download_photos.py`, then set `CFG.local = true` in `js/app.js`.

**Live Google photos:** see `backend/main.py`. Set `GOOGLE_API_KEY` as an environment variable, run `uvicorn main:app`, then set `CFG.api` in `js/app.js`. Never commit your API key.

## Notes

Ratings are a Google Maps snapshot (October 2026). Confirm prices and hours before travelling. Stock photos from [Pexels](https://www.pexels.com/) illustrate a place type and may not show the exact venue.

## License

[MIT](LICENSE)

## Author

Ramya Vengadesan · [@RamyaVengadesan](https://github.com/RamyaVengadesan)
