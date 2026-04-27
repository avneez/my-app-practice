/**
 * test.js
 * Runs the processor with mock scraped data to verify everything works
 * without needing to hit Booking.com.
 */

const { processHotels } = require('./processor');

const mockRaw = [
  { id: 'hotel_1', name: 'Radisson Blu Hotel Indore', address: 'Bhawarkua Square, Indore', priceRaw: '₹8,500', ratingRaw: '8.7', reviewCountRaw: '2,341 reviews', distanceRaw: '2.1 km from centre', href: 'https://www.booking.com/hotel/in/radisson-blu-indore.html', lat: 22.7045, lng: 75.8879 },
  { id: 'hotel_2', name: 'Fortune Landmark Hotel', address: 'Scheme No. 54, Indore', priceRaw: '₹5,200', ratingRaw: '8.1', reviewCountRaw: '1,890 reviews', distanceRaw: '1.5 km from centre', href: 'https://www.booking.com/hotel/in/fortune-landmark-indore.html', lat: 22.7256, lng: 75.8692 },
  { id: 'hotel_3', name: 'Lemon Tree Premier Indore', address: 'MG Road, Indore', priceRaw: '₹6,800', ratingRaw: '8.4', reviewCountRaw: '3,102 reviews', distanceRaw: '0.8 km from centre', href: 'https://www.booking.com/hotel/in/lemon-tree-premier-indore.html', lat: 22.7196, lng: 75.8577 },
  { id: 'hotel_4', name: 'Sayaji Hotel Indore', address: 'H-1 Scheme 54, Indore', priceRaw: '₹7,200', ratingRaw: '8.3', reviewCountRaw: '4,500 reviews', distanceRaw: '1.2 km from centre', href: 'https://www.booking.com/hotel/in/sayaji-indore.html', lat: 22.7130, lng: 75.8600 },
  { id: 'hotel_5', name: 'Hotel Shreemaya', address: 'Race Course Road, Indore', priceRaw: '₹3,800', ratingRaw: '7.8', reviewCountRaw: '980 reviews', distanceRaw: '3.5 km from centre', href: 'https://www.booking.com/hotel/in/shreemaya.html', lat: 22.7310, lng: 75.8750 },
  { id: 'hotel_6', name: 'Grand Bhagwati Hotel', address: 'Palasia, Indore', priceRaw: '₹2,900', ratingRaw: '7.5', reviewCountRaw: '740 reviews', distanceRaw: '2.8 km from centre', href: 'https://www.booking.com/hotel/in/grand-bhagwati-indore.html', lat: 22.7280, lng: 75.8650 },
  { id: 'hotel_7', name: 'Hotel President', address: 'RNT Marg, Indore', priceRaw: '₹2,400', ratingRaw: '7.2', reviewCountRaw: '560 reviews', distanceRaw: '0.5 km from centre', href: 'https://www.booking.com/hotel/in/hotel-president-indore.html', lat: 22.7200, lng: 75.8570 },
  { id: 'hotel_8', name: 'WelcomHotel Sheraton Indore', address: 'Vijay Nagar, Indore', priceRaw: '₹11,000', ratingRaw: '9.0', reviewCountRaw: '1,200 reviews', distanceRaw: '4.2 km from centre', href: 'https://www.booking.com/hotel/in/welcomhotel-sheraton-indore.html', lat: 22.7480, lng: 75.9010 },
  { id: 'hotel_9', name: 'Hotel Noorjahan', address: 'Navlakha, Indore', priceRaw: '₹1,900', ratingRaw: '6.8', reviewCountRaw: '310 reviews', distanceRaw: '5.1 km from centre', href: null, lat: null, lng: null },
  { id: 'hotel_10', name: 'Indore Residency', address: 'Old Palasia, Indore', priceRaw: '₹2,100', ratingRaw: '7.0', reviewCountRaw: '420 reviews', distanceRaw: '3.0 km from centre', href: 'https://www.booking.com/hotel/in/indore-residency.html', lat: 22.7230, lng: 75.8700 },
  { id: 'hotel_11', name: 'Hotel Balwas', address: 'Siyaganj, Indore', priceRaw: '₹1,600', ratingRaw: '6.5', reviewCountRaw: '190 reviews', distanceRaw: '1.0 km from centre', href: null, lat: 22.7150, lng: 75.8560 },
  { id: 'hotel_12', name: 'Effotel Hotel Indore', address: 'Bhawarkua, Indore', priceRaw: '₹4,500', ratingRaw: '8.0', reviewCountRaw: '1,050 reviews', distanceRaw: '2.0 km from centre', href: 'https://www.booking.com/hotel/in/effotel-indore.html', lat: 22.7060, lng: 75.8850 },
];

const processed = processHotels(mockRaw);

console.log('\n====== ALL HOTELS (processed) ======\n');
processed.forEach(h => {
  console.log(`[${h.id}] ${h.name}`);
  console.log(`  Price: ${h.priceRaw} → $${h.priceUSD} (${h.category})`);
  console.log(`  Rating: ${h.rating} (${h.reviewCount} reviews)`);
  console.log(`  Distance: ${h.distanceFromCentreKm} km from centre`);
  console.log(`  Coords: ${h.lat ?? 'N/A'}, ${h.lng ?? 'N/A'}`);
  console.log();
});

console.log('====== PAGINATION TEST (page=1, limit=4) ======\n');
const page = 1, limit = 4;
const paginated = processed.slice((page - 1) * limit, page * limit);
console.log(JSON.stringify({
  pagination: { page, limit, total: processed.length, totalPages: Math.ceil(processed.length / limit) },
  data: paginated.map(h => ({ id: h.id, name: h.name, priceUSD: h.priceUSD, rating: h.rating }))
}, null, 2));

console.log('\n====== TOP 3 NEAREST HOTELS ======\n');
const DEST_LAT = 22.7196, DEST_LNG = 75.8577;
const withDist = processed.map(h => {
  let d = null;
  if (h.lat && h.lng) {
    const R = 6371, dLat = ((h.lat - DEST_LAT) * Math.PI) / 180, dLng = ((h.lng - DEST_LNG) * Math.PI) / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(DEST_LAT*Math.PI/180)*Math.cos(h.lat*Math.PI/180)*Math.sin(dLng/2)**2;
    d = parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2));
  }
  return { ...h, distanceKm: d };
}).sort((a, b) => {
  if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm;
  if (a.distanceKm !== null) return -1;
  return 1;
});
withDist.slice(0, 3).forEach((h, i) => {
  console.log(`#${i+1} ${h.name} — ${h.distanceKm} km away — Rating: ${h.rating} — $${h.priceUSD}/night`);
});
