const pool = require('../config/db');
const { getCoordinates, calculateDistance } = require('./maps.service');


// const addUserLocation = async (data) => {
//   const { user_id, pickup_address, drop_address } = data;

//   // console.log("DEBUG:", data);
//   // console.log("PICKUP:", pickup_address);
//   // console.log("DROP:", drop_address);
//   const pickup = await getCoordinates(pickup_address);
//   const drop = await getCoordinates(drop_address);

//   const distance = await calculateDistance(
//     pickup.address,
//     drop.address
//   );

//   console.log("DISTANCE:", distance);

//   const result = await pool.query(
//     `INSERT INTO user_locations 
//     (user_id, pickup_address, pickup_lat, pickup_lng,
//      drop_address, drop_lat, drop_lng, distance_km)
//      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
//      RETURNING *`,
//     [
//       user_id,
//       pickup.address,
//       pickup.lat,
//       pickup.lng,
//       drop.address,
//       drop.lat,
//       drop.lng,
//       distance.distance_value / 1000 // meters → km
//     ]
//   );

//   return result.rows[0];
// };

const addUserLocation = async (data) => {
  const { user_id, route_id } = data;

  // 🔹 1. Get route
  const routeRes = await pool.query(
    `SELECT * FROM routes WHERE id = $1 AND is_active = true`,
    [route_id]
  );

  if (routeRes.rows.length === 0) {
    throw new Error("Route not available");
  }

  const route = routeRes.rows[0];

  // 🔹 2. Save into user_locations
  const result = await pool.query(
    `INSERT INTO user_locations 
    (user_id,
     pickup_address, pickup_lat, pickup_lng,
     drop_address, drop_lat, drop_lng,
     distance_km,
     route_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      user_id,
      route.start_location,
      route.start_lat,
      route.start_lng,
      route.end_location,
      route.end_lat,
      route.end_lng,
      null, // optional for now
      route.id
    ]
  );

  return result.rows[0];
};

const getUserLocation = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM user_locations WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

module.exports = { addUserLocation, getUserLocation };