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

  const existing = await pool.query(
    `SELECT * FROM user_locations WHERE user_id = $1`,
    [userId]
  );

  if (existing.rows.length > 0) {
    const result = await pool.query(
      `UPDATE user_locations
       SET pickup_address=$2, pickup_lat=$3, pickup_lng=$4,
           drop_address=$5, drop_lat=$6, drop_lng=$7,
           updated_at=NOW()
       WHERE user_id=$1
       RETURNING *`,
      [userId, pickup_address, pickup_lat, pickup_lng, drop_address, drop_lat, drop_lng]
    );

    return result.rows[0];
  }

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