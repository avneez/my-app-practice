const express = require("express");
const app = express();
const PORT = 3000;

// Example user location (Delhi)
const USER_LAT = 28.6139;
const USER_LON = 77.209;

// Mock API (import ./hotels-data.json)
const hotelsData = require("./hotels-data.json");

//Utility function to calculate distance between two coordinates (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Fetch hotels with pagination
async function fetchHotels() {
  const data = hotelsData?.hotels;
  console.log("data: ", data);

  // Map mock data → hotel-like structure
  return data.map((item, index) => ({
    id: item.id,
    name: item.name,
    location: {
      latitude: item.location.latitude,
      longitude: item.location.longitude,
    },
    hotelRating: Number(item.hotelRating),
    city: item.city,
    distance: Number(
      getDistance(
        USER_LAT,
        USER_LON,
        item.location.latitude,
        item.location.longitude,
      ),
    ).toFixed(2),
  }));
}

function filterByRating(hotels, minRating, maxRating) {
  return hotels.filter((hotel) => {
    const rating = parseFloat(hotel.hotelRating);

    if (minRating && rating < minRating) return false;
    if (maxRating && rating > maxRating) return false;

    return true;
  });
}

function sortHotels(hotels, sortBy, userLat, userLon) {
  if (!sortBy) return hotels;

  const toBeSortedHotels = [...hotels]; // avoid mutating original array

  switch (sortBy) {
    case "rating_asc":
      return toBeSortedHotels.sort(
        (a, b) => Number(a.hotelRating) - Number(b.hotelRating),
      );

    case "rating_desc":
      return toBeSortedHotels.sort(
        (a, b) => Number(b.hotelRating) - Number(a.hotelRating),
      );

    case "distance_asc":
      return toBeSortedHotels
        .map((h) => ({
          ...h,
          distance: Number(
            getDistance(
              userLat,
              userLon,
              h.location.latitude,
              h.location.longitude,
            ),
          ).toFixed(2),
        }))
        .sort((a, b) => a.distance - b.distance);

    default:
      return hotels;
  }
}

// API to get hotels (top hotels, filtering, sorting, pagination)

// Pagination API
app.get("/hotels", async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Fetch FULL dataset (not paginated)
    let hotels = await fetchHotels();

    // Filter
    const minRating = req.query.minRating;
    const maxRating = req.query.maxRating;

    if (!Number.isNaN(minRating) || !Number.isNaN(maxRating)) {
      hotels = filterByRating(hotels, minRating, maxRating);
      console.log("Filtered Hotels:", hotels);
    }

    // Sort
    const sortBy = req.query.sortBy;

    if (sortBy) {
      hotels = sortHotels(hotels, sortBy, USER_LAT, USER_LON);
    }

    // Add distance info
    hotels = hotels.map((h) => ({
      ...h,
      distance: Number(
        getDistance(
          USER_LAT,
          USER_LON,
          h.location.latitude,
          h.location.longitude,
        ).toFixed(2),
      ),
    }));

    // Pagination AFTER sorting
    const paginatedHotels = hotels.slice(offset, offset + limit);

    res.json({
      offset,
      limit,
      total: hotels.length,
      count: paginatedHotels.length,
      data: paginatedHotels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching hotels");
  }
});

// Get Top 3 nearest hotels
app.get("/nearest-hotels", async (req, res) => {
  try {
    const hotels = await fetchHotels();

    const sorted = hotels
      .map((hotel) => ({
        ...hotel,
        distance: getDistance(
          USER_LAT,
          USER_LON,
          hotel.location.latitude,
          hotel.location.longitude,
        ).toFixed(2),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    console.log("Top 3 Hotels:", sorted);

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching hotels");
  }
});

app.get("/top-rated-hotels", async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    let hotels = await fetchHotels();
    hotels = hotels.sort(
      (a, b) => Number(b.hotelRating) - Number(a.hotelRating),
    );

    const topHotels = hotels.slice(offset, offset + limit);
    res.json(topHotels);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching hotels");
  }
});

// Simple HTML Output
app.get("/", async (req, res) => {
  const hotels = await fetchHotels();

  let html = `<h1>Hotels List</h1><ul>`;

  hotels?.forEach((hotel) => {
    html += `<li>${hotel.name}, ${hotel.city} | <b>Rating</b>: ${hotel.hotelRating} | <b>Distance</b>: ${hotel.distance} km</li>`;
  });

  html += `</ul>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
