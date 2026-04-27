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
 * Parses review count like "1,234 reviews" → integer
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

module.exports = { processHotels };
