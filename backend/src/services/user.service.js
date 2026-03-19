const pool = require('../config/db');

const addUserLocation = async (userId, data) => {
  const {
    pickup_address,
    pickup_lat,
    pickup_lng,
    drop_address,
    drop_lat,
    drop_lng,
  } = data;

  const result = await pool.query(
    `INSERT INTO user_locations 
    (user_id, pickup_address, pickup_lat, pickup_lng, drop_address, drop_lat, drop_lng)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [userId, pickup_address, pickup_lat, pickup_lng, drop_address, drop_lat, drop_lng]
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