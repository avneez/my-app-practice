const express = require('express');
const cors = require('cors');
const { scrapeBooking } = require('./scraper');
const { processHotels } = require('./processor');

const app = express();
app.use(cors());
app.use(express.json());

const BOOKING_URL = `https://www.booking.com/searchresults.en-gb.html?ss=Indore&ssne=Indore&ssne_untouched=Indore&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2097803&dest_type=city&checkin=2026-04-17&checkout=2026-04-19&group_adults=2&no_rooms=1&group_children=0`;

const destination = BOOKING_URL.split('?')[1].split('&')[0].split("=")[1];

let hotels = null;
// let cachedHotels = null;
// let cacheTimestamp = null;
// const CACHE_TTL = 5 * 60 * 1000; // 5 min cache

async function getHotels() {
  // const now = Date.now();
  // if (cachedHotels && cacheTimestamp && (now - cacheTimestamp) < CACHE_TTL) {
  //   console.log('[cache] Returning cached hotels');
  //   return cachedHotels;
  // }
  console.log('[scraper] Fetching fresh data from Booking.com...');
  const raw = await scrapeBooking(BOOKING_URL);
  hotels = processHotels(raw)
  return hotels;

  //if using cache
  // cachedHotels = processHotels(raw);
  // cacheTimestamp = now;
  // return cachedHotels
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
    //Avoid mutating original array
    if (sortFns[sort]) hotels = [...hotels].sort(sortFns[sort]);

    const total = hotels.length;
    const totalPages = Math.ceil(total / limitNum);
    const start = (pageNum - 1) * limitNum;
    const data = hotels.slice(start, start + limitNum);

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
