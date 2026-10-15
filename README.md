<div align="center">

# 🌴 Puducherry Travel Guide

**A fast, responsive, dependency-free travel guide to Puducherry: beaches, White Town, Auroville, temples, food, stays and ready-made itineraries.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-optional-009688?logo=fastapi&logoColor=white)
![No dependencies](https://img.shields.io/badge/frontend_dependencies-0-brightgreen)

[Live Demo](#-live-demo) · [Features](#-features) · [Getting Started](#-getting-started) · [Customisation](#-customisation)

</div>

---

## 📖 About

Puducherry Travel Guide is a single-page, static website that helps visitors plan a trip to Puducherry (Pondicherry), the former French colony on India's Coromandel Coast. It brings **148 curated places**, day-wise itineraries, a budget planner, seasonal advice, local tips and an FAQ into one polished, mobile-friendly experience.

The frontend is built with **plain HTML, CSS and JavaScript**: no frameworks, no build step, no `npm install`. Open `index.html` and it works. It can be hosted for free on GitHub Pages, Netlify or any static host.

## 🌐 Live Demo

> Add your link here after deploying, for example: `https://ramyavengadesan.github.io/PU-Travel-Hub/`

## ✨ Features

- **148 curated places** across Sights, Auroville, Food, Stays, Fun, Rentals and Day Trips, each with Google rating, review count, opening hours, best time to visit and a short description
- **Smart explore section** with category filters, search and sorting (e.g. A to Z)
- **My Trip**: save favourite places with one tap (stored in the browser's `localStorage`) and **print** your shortlist
- **Ready-made itineraries**: 1-day, 2-day and longer plans with the stops linked to the place database
- **Budget planner** that estimates total and per-person cost
- **Best time to visit** guide with month-by-month ratings, plus a festivals and events calendar
- **White Town walking route**, Auroville guide and day-trip suggestions (Mahabalipuram, Gingee Fort, Pichavaram, Chidambaram and more)
- **Food and stay guides** with Veg / Non-Veg filtering
- **Practical info**: travel tips, emergency contacts, official links and FAQ
- **One-tap Google Maps** directions and reviews for every place
- **Responsive and accessible**: skip link, ARIA labels, keyboard-friendly dialogs and `prefers-reduced-motion` support
- **SEO-ready**: meta description, Open Graph and Twitter tags, and `schema.org` JSON-LD (`TouristDestination`)
- **Optional FastAPI backend** to fetch live Google Places photos and ratings

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic sections, inline SVG icon sprite) |
| Styling | CSS3 (custom properties, grid, flexbox, responsive rules) |
| Logic | Vanilla JavaScript (ES5-compatible, no dependencies) |
| Fonts | Fraunces and Inter (Google Fonts) |
| Photos | Pexels CDN, with bundled local photos for selected places |
| Backend (optional) | Python, FastAPI, httpx, Google Places API (New) |

## 📁 Project Structure

```text
puducherry-travel-guide/
├── index.html                # Page markup and SEO metadata
├── css/
│   └── styles.css            # Design system, layout, motion, responsive rules
├── js/
│   ├── data.js               # 148 places + photo library
│   ├── content.js            # Editorial content: hero, itineraries, FAQ, events, tips, costs
│   └── app.js                # Slider, filters, dialogs, My Trip, budget planner
├── img/
│   └── places/               # Locally bundled photos
├── backend/                  # Optional FastAPI proxy for live Google photos/ratings
│   ├── main.py
│   └── requirements.txt
└── tools/
    └── download_photos.py    # Optional: download all photos for offline use
```

## 🚀 Getting Started

### Run locally

```bash
git clone https://github.com/<your-username>/puducherry-travel-guide.git
cd puducherry-travel-guide
```

Then either open `index.html` in your browser, or serve it locally:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

> An internet connection is needed for Google Fonts and Pexels photos unless you use the offline mode below.

### Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## 🎨 Customisation

| I want to... | Edit |
|---|---|
| Add or change a place | The record in `js/data.js` (keep the `i` photo key valid) |
| Change text, itineraries, FAQ, events, costs | `js/content.js` |
| Change colours and fonts | CSS variables at the top of `css/styles.css` |
| Use my own photo for a place | Add a key to the `LOCAL` map in `js/data.js` and point the place's `i` value to it |

**Place record format**

```js
{ s: "promenade-beach",        // slug
  n: "Promenade Beach",        // name
  g: "sights",                 // section
  c: "Beaches",                // category
  r: 4.5, k: 9701,             // Google rating, review count
  h: "Open all day",           // hours
  b: "Sunrise or sunset",      // best time
  id: "<google_place_id>",     // for map links
  d: "Description…",           // description
  i: "prom_beach" }            // photo key
```

## 📴 Offline / Self-hosted Photos

```bash
python tools/download_photos.py
```

Then set `CFG.local = true` in `js/app.js`. Photos are saved to `img/photos/`.

## 🔌 Optional: Live Google Photos & Ratings

The `backend/` folder contains a small FastAPI proxy so your API key is never exposed in the browser.

```bash
cd backend
pip install -r requirements.txt
export GOOGLE_API_KEY="your-key"                    # Windows: set GOOGLE_API_KEY=your-key
export ALLOWED_ORIGINS="https://your-site.com"      # restrict CORS in production
uvicorn main:app --reload
```

Then set `CFG.api` in `js/app.js` to your backend URL.

**Notes:** enable *Places API (New)* in Google Cloud, restrict your API key, and keep Google attribution (cards already link to Google Maps). Never commit your API key.

## ⚠️ Disclaimer

- Ratings and review counts are a **Google Maps snapshot (October 2026)**. Prices, hours and availability change, so confirm before travelling.
- Stock photos illustrate a place type or area and may not show the exact venue.

## 🙏 Credits

- Stock photography from [Pexels](https://www.pexels.com/) and their photographers
- Typography: [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Inter](https://fonts.google.com/specimen/Inter)
- Place data and maps: Google Maps

## 📄 License

Released under the [MIT License](LICENSE). Replace the name in the `LICENSE` file with your own.

## 👤 Author

**Your Name**
GitHub: `RamyaVengadesan`

---

<div align="center">

If you find this project useful, please give it a ⭐

</div>
