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

module.exports = { createRoute, getAllRoutes };