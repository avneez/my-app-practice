# Booking.com Scraper API

Backend solution for Round 2 coding challenge. Scrapes Booking.com search results, processes hotel data, and exposes a paginated REST API.

## Setup

```bash
npm install
npm start          # production
npm run dev        # with nodemon hot-reload
node test.js       # run with mock data (no network needed)
```

## Architecture

```
Client → Express Router → Cache Check
                               ↓
                        Scraper Engine (Puppeteer → axios fallback)
                               ↓
                        Data Processor (normalize, parse, infer)
                               ↓
                    ┌──────────────────────┐
                    │  /hotels/top3        │  → top 3 by Haversine distance
                    │  /hotels?page=&limit=│  → paginated full list
                    └──────────────────────┘
```

## API Reference

### `GET /hotels`

Returns all hotels with server-side pagination.

| Param | Default | Description |
|-------|---------|-------------|
| `page` | 1 | Page number |
| `limit` | 10 | Items per page (max 50) |
| `sort` | `rating_desc` | `price_asc`, `price_desc`, `rating_desc` |
| `minPrice` | — | Minimum price in USD |
| `maxPrice` | — | Maximum price in USD |

**Response:**
```json
{
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 35,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    {
      "id": "hotel_1",
      "name": "Radisson Blu Hotel Indore",
      "address": "Bhawarkua Square, Indore",
      "priceRaw": "₹8,500",
      "priceUSD": 102.0,
      "priceINR": 8500,
      "rating": 8.7,
      "reviewCount": 2341,
      "distanceFromCentreKm": 2.1,
      "category": "Upscale",
      "bookingUrl": "https://www.booking.com/...",
      "lat": 22.7045,
      "lng": 75.8879,
      "deal": null,
      "checkin": "2026-04-17",
      "checkout": "2026-04-19",
      "nights": 2
    }
  ]
}
```

### `GET /hotels/top3`

Returns 3 hotels closest to destination (Indore city centre) using Haversine formula.

```json
{
  "success": true,
  "destination": "Indore, Madhya Pradesh",
  "destinationCoords": { "lat": 22.7196, "lng": 75.8577 },
  "top3": [
    {
      "name": "Lemon Tree Premier Indore",
      "distanceKm": 0.04,
      "rating": 8.4,
      "priceUSD": 81.6
    }
  ]
}
```

### `GET /hotels/:id`

Returns a single hotel by id.

### `GET /health`

Returns server health + cache status.

## Design Decisions

1. **Dual scraping strategy**: Puppeteer (headless Chrome) handles JS-rendered content and anti-bot measures. Falls back to axios + cheerio for faster, lighter environments.

2. **5-min in-memory cache**: Avoids hammering Booking.com on every request. Can be swapped for Redis in production.

3. **Haversine distance**: Exact great-circle distance formula for finding nearest hotels to destination coords.

4. **Price normalization**: Converts ₹/€/£ to USD using approximate conversion rates. Shows both raw and converted values.

5. **Cheerio selectors target `data-testid` attributes**: More stable than CSS class names which Booking.com rotates frequently.

## Notes

- Booking.com actively blocks scrapers. In production, consider rotating proxies (ScraperAPI, Bright Data) or their official Partner API.
- If `puppeteer` install is too heavy, use `puppeteer-core` + system Chrome.
- Coordinates (`lat`/`lng`) are not always available from Booking.com HTML; the Haversine fallback sorts by rating when coords are missing.
