const pool = require('../config/db');

const createDriver = async (data) => {
  const { name, phone, license_number } = data;

  const result = await pool.query(
    `INSERT INTO drivers (name, phone, license_number)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, phone, license_number]
  );

  return result.rows[0];
};

const getDrivers = async () => {
  const result = await pool.query(`SELECT * FROM drivers`);
  return result.rows;
};

const getDriverEarnings = async (driver_id) => {
  const result = await pool.query(
    `
    SELECT COALESCE(SUM(p.amount), 0) AS total_earnings
    FROM payments p
    JOIN subscriptions s ON p.subscription_id = s.id
    JOIN routes r ON s.route_id = r.id
    JOIN driver_routes dr ON dr.route_id = r.id
    WHERE dr.driver_id = $1
    `,
    [driver_id]
  );

  return {
    total_earnings: parseInt(result.rows[0].total_earnings)
  };
};

const getDriverPayments = async (driver_id) => {
  const result = await pool.query(
    `
    SELECT p.*
    FROM payments p
    JOIN subscriptions s ON p.subscription_id = s.id
    JOIN routes r ON s.route_id = r.id
    JOIN driver_routes dr ON dr.route_id = r.id
    WHERE dr.driver_id = $1
    ORDER BY p.paid_at DESC
    `,
    [driver_id]
  );

  return result.rows;
};

module.exports = { createDriver, getDrivers, getDriverEarnings, getDriverPayments };