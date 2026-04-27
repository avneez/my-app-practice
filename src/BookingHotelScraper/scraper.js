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
    // args: [
    //   '--start-maximized',
    //   '--disable-blink-features=AutomationControlled',
    // ],
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

      //Review Count
      const reviewCountRaw = card.find('[data-testid="review-score"] > div + div + div > div + div').text().trim()

      // Address / location
      const address = card.find('[data-testid="address-link"]').text().trim()

      // Distance from city center
      const distanceRaw = card.find('[data-testid="distance"]').text().trim()

      // Booking URL
      const href = card.find('a[data-testid="title-link"]').attr('href')

      // Coordinates (sometimes embedded in data attributes)
      const lat = parseFloat(card.attr('data-lat') || card.find('[data-lat]').attr('data-lat'));
      const lng = parseFloat(card.attr('data-lon') || card.find('[data-lon]').attr('data-lon'));

      // Image
      const image = card.find('[data-testid="property-card-desktop-single-image"]').attr('src')

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

// ─── Main export — tries Puppeteer first, falls back to axios ─────────────────
async function scrapeBooking(url) {
  try {
    return await scrapeWithPuppeteer(url);
  } catch (err) {
    console.warn(`[scraper] Puppeteer failed (${err.message})`);
    // return await scrapeWithAxios(url);
  }
}

module.exports = { scrapeBooking };
