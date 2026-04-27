const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BOOKING_URL = `https://www.booking.com/searchresults.en-gb.html?ss=Indore&ssne=Indore&ssne_untouched=Indore&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2097803&dest_type=city&checkin=2026-04-17&checkout=2026-04-19&group_adults=2&no_rooms=1&group_children=0`;

const destination = BOOKING_URL.split('?')[1].split('&')[0].split("=")[1];

let hotels = null;

async function getHotels() {
  console.log('[scraper] Fetching fresh data from Booking.com...');
  const raw = await scrapeBooking(BOOKING_URL);
  hotels = processHotels(raw)
  return hotels;
}

/**
 * GET /hotels
 * Query params:
 *   page     - page number (default: 1)
 *   limit    - results per page (default: 10)
 *   sort     - 'price_asc' | 'price_desc' | 'rating_desc' (default: rating_desc)
 *   minPrice - filter min price (INR)
 *   maxPrice - filter max price (INR)
 */
app.get('/hotels', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'rating_desc',
      minPrice,
      maxPrice,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));

    let hotels = await getHotels();

    // Filtering
    if (minPrice) hotels = hotels.filter(h => h.priceINR >= parseFloat(minPrice));
    if (maxPrice) hotels = hotels.filter(h => h.priceINR <= parseFloat(maxPrice));

    // Sorting
    const sortFns = {
      price_asc: (a, b) => a.priceINR - b.priceINR,
      price_desc: (a, b) => b.priceINR - a.priceINR,
      rating_desc: (a, b) => b.rating - a.rating,
    };
    // Avoid mutating original array
    if (sortFns[sort]) hotels = [...hotels].sort(sortFns[sort]);

    const total = hotels.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const data = hotels.slice(start, start + limitNum); //Pagination (offset,limit)

    res.json({
      success: true,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      },
      data,
    });
  } catch (err) {
    console.error('[/hotels] Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /hotels/top3
 * Returns top 3 hotels nearest to the destination centre (Indore, MP)
 * Sorted by: distance first (if coords available), then rating
 */
app.get('/hotels/top3nearest', async (req, res) => {
  try {
    const hotels = await getHotels();

    const withDistance = hotels.map(h => {
      distance = h.distanceFromCentreKm;
      return { ...h, distanceKm: distance };
    });

    // Sort: hotels with coords first by distance, then by rating
    const sorted = withDistance.sort((a, b) => {
      if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm;
      if (a.distanceKm !== null) return -1; // prioritize a
      if (b.distanceKm !== null) return 1; // prioritize b
      return b.rating - a.rating;
    });

    res.json({
      success: true,
      destination: `${destination}`,
      top3: sorted.slice(0, 3),
    });
  } catch (err) {
    console.error('[/hotels/top3] Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /hotels/:id
 * Get a specific hotel by id
 */
app.get('/hotels/:id', async (req, res) => {
  try {
    const hotels = await getHotels();
    const hotel = hotels.find(h => h.id === req.params.id);
    if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });
    res.json({ success: true, data: hotel });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Booking scraper API running on http://localhost:${PORT}`));

// ------------------------------------------------------------------------------------

/**
* scraper.js
* Scrapes Booking.com search results using Puppeteer.
*/

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// ─── Strategy 1: Puppeteer (headless browser, handles JS-rendered content) ───
async function scrapeWithPuppeteer(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    // Spoof a real browser fingerprint to reduce bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-GB,en;q=0.9',
      Accept:
        'text/html,application/xhtml+xml,application/xhtml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    });

    console.log('[puppeteer] Navigating to Booking.com...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Dismiss cookie consent if present
    try {
      await page.click('[id*="onetrust-accept"]', { timeout: 3000 });
      await page.waitForTimeout(1000);
    } catch (_) {}

    // Wait for hotel cards to load
    await page.waitForSelector('[data-testid="property-card"]', { timeout: 15000 });

    const html = await page.content();
    return parseHtml(html);
  } finally {
    await browser.close();
  }
}

// ─── HTML Parser ──────────────────────────────────
function parseHtml(html) {
  const $ = cheerio.load(html);
  const hotels = [];

  // Booking.com uses data-testid="property-card" for each hotel card
  $('[data-testid="property-card"]').each((i, el) => {
    try {
      const card = $(el);

      // Hotel name
      const name = card.find('[data-testid="title"]').text().trim()

      // Price — may be in various currencies
      const priceRaw = card.find('[data-testid="price-and-discounted-price"]').text().trim()

      // Rating
      const ratingRaw = card.find('[data-testid="review-score"]').text().trim()

      //Review Count (can ignore)
      const reviewCountRaw = card.find('[data-testid="review-score"] > div + div + div > div + div').text().trim()

      // Address / location
      const address = card.find('[data-testid="address-link"]').text().trim()

      // Distance from city center
      const distanceRaw = card.find('[data-testid="distance"]').text().trim()

      if (!name) return; // skip empty cards

      hotels.push({
        id: `hotel_${i + 1}`,
        name,
        address,
        priceRaw,
        distanceRaw,
        ratingRaw,
        reviewCountRaw,
      });
    } catch (err) {
      console.warn(`[parser] Skipped card ${i}: ${err.message}`);
    }
  });

  console.log(`[parser] Extracted ${hotels.length} hotel cards`);
  return hotels;
}

// ─── Main export — tries Puppeteer  ─────────────────
async function scrapeBooking(url) {
  try {
    return await scrapeWithPuppeteer(url);
  } catch (err) {
    console.warn(`[scraper] Puppeteer failed (${err.message})`);
  }
}

// ----------------------------------------------------------
/**
 * processor.js
 * Normalizes raw scraped hotel data into clean structured objects.
 */

/**
 * Parses price string like "₹2,500", "$45", "€ 120" → float
*/

function parsePrice(raw) {
  if (!raw) return null;

  // Remove $, commas, whitespace
  const cleaned = raw.replace(/[^0-9.]/g, '');
  return isNaN(cleaned) ? null : parseFloat(cleaned).toFixed(2);
}

/**
 * Parses rating like "8.5", "Excellent 9.2", "4.5 / 5" → float 0-10
 */
function parseRating(raw) {
  if (!raw) return null;
  const match = raw.match(/[\d.]+/);
  if (!match) return null;
  const val = parseFloat(match[0]);
  // If on a 5-point scale, convert to 10
  return val <= 5 ? parseFloat((val * 2).toFixed(1)) : val;
}

/**
 * Parses review count like "1,234 reviews" → integer (can ignore if not necessary)
 */
function parseReviewCount(raw) {
  if (!raw) return null;
  const match = raw.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

/**
 * Parses distance like "0.5 km from centre", "500 m from centre" → km float
 */
function parseDistance(raw) {
  if (!raw) return null;

  // Split by space: "500 m" becomes ["500", "m"]
  const parts = raw.toLowerCase().trim().split(' ');
  const value = parseFloat(parts[0]);
  const unit = parts[1];
  if (isNaN(value)) return null;

  // Logic based on the unit
  if (unit === 'km') return value;
  if (unit === 'm') return value / 1000;

  return null;
}

/**
 * Main processor — takes raw scraped array, returns normalized Hotel[]
 */
function processHotels(rawHotels) {
  return rawHotels.map((h, i) => {
    const priceINR = parsePrice(h.priceRaw);
    const rating = parseRating(h.ratingRaw);
    const reviewCount = parseReviewCount(h.reviewCountRaw);
    const distanceFromCentreKm = parseDistance(h.distanceRaw);

    return {
      id: h.id || `hotel_${i + 1}`,
      name: h.name,
      address: h.address || null,
      priceRaw: h.priceRaw || null,
      priceINR: priceINR ? priceINR : null,
      rating,
      reviewCount,
      distanceFromCentreKm,
      checkin: '2026-04-17',
      checkout: '2026-04-19',
      nights: 2,
    };
  }).filter(h => h.name); // remove any nameless entries
}
// ----------------------------------------------------------
