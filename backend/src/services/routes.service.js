const pool = require('../config/db');

const createRoute = async (data) => {
  const {
    name,
    start_location,
    end_location,
    start_time,
    end_time,
    total_seats,
  } = data;

  const result = await pool.query(
    `INSERT INTO routes 
    (name, start_location, end_location, start_time, end_time, total_seats, available_seats)
    VALUES ($1,$2,$3,$4,$5,$6,$6)
    RETURNING *`,
    [name, start_location, end_location, start_time, end_time, total_seats]
  );

  return result.rows[0];
};

const getAllRoutes = async () => {
  const result = await pool.query(
    `SELECT * FROM routes WHERE is_active = true`
  );

  return result.rows;
};

const findMatchingRoutes = async (user_id) => {
  // 1. Get user location
  const userResult = await pool.query(
    `SELECT * FROM user_locations WHERE user_id = $1`,
    [user_id]
  );

  const user = userResult.rows[0];

  if (!user) throw new Error("User location not found");

  // 2. Get all routes
  const routesResult = await pool.query(`SELECT * FROM routes`);

  const routes = routesResult.rows;

  const matchedRoutes = [];

  for (let route of routes) {
    // distance formula (simple approx)
    const pickupDiff = Math.sqrt(
      Math.pow(route.start_lat - user.pickup_lat, 2) +
      Math.pow(route.start_lng - user.pickup_lng, 2)
    );

    const dropDiff = Math.sqrt(
      Math.pow(route.end_lat - user.drop_lat, 2) +
      Math.pow(route.end_lng - user.drop_lng, 2)
    );

    // threshold ~0.02 ≈ 2km
    if (pickupDiff < 0.02 && dropDiff < 0.02) {
      matchedRoutes.push(route);
    }
  }

  return matchedRoutes;
};

module.exports = { createRoute, getAllRoutes, findMatchingRoutes };