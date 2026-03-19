const pool = require('../config/db');

const markAttendance = async (data) => {
  const { user_id, driver_id, route_id, date, pickup_status, drop_status } = data;

  const result = await pool.query(
    `INSERT INTO attendance 
    (user_id, driver_id, route_id, date, pickup_status, drop_status)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [user_id, driver_id, route_id, date, pickup_status, drop_status]
  );

  return result.rows[0];
};

const getUserAttendance = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM attendance WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

module.exports = { markAttendance, getUserAttendance };