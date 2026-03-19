const pool = require('../config/db');

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role FROM users`
  );

  return result.rows;
};

const verifyDriver = async (driver_id) => {
  const result = await pool.query(
    `UPDATE drivers 
     SET verification_status = 'VERIFIED'
     WHERE id = $1
     RETURNING *`,
    [driver_id]
  );

  return result.rows[0];
};

const createPlan = async (data) => {
  const { name, price, duration_days } = data;

  const result = await pool.query(
    `INSERT INTO plans (name, price, duration_days)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, price, duration_days]
  );

  return result.rows[0];
};

const createComplaint = async (data) => {
  const { user_id, driver_id, message } = data;

  const result = await pool.query(
    `INSERT INTO complaints (user_id, driver_id, message)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [user_id, driver_id, message]
  );

  return result.rows[0];
};

const getComplaints = async () => {
  const result = await pool.query(`SELECT * FROM complaints`);
  return result.rows;
};

const getAnalytics = async () => {
  const users = await pool.query(`SELECT COUNT(*) FROM users`);
  const subs = await pool.query(`SELECT COUNT(*) FROM subscriptions`);
  const revenue = await pool.query(`SELECT COALESCE(SUM(amount),0) FROM payments`);

  return {
    total_users: parseInt(users.rows[0].count),
    total_subscriptions: parseInt(subs.rows[0].count),
    total_revenue: parseInt(revenue.rows[0].coalesce || revenue.rows[0].sum),
  };
};

module.exports = {
  getAllUsers,
  verifyDriver,
  createPlan,
  createComplaint,
  getComplaints,
  getAnalytics
};