const pool = require('../config/db');

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, role FROM users`
  );

  return result.rows;
};

const getAvailableDriversByRoute = async (route_id) => {
  const result = await pool.query(
    `
    SELECT d.id, d.name, d.phone
    FROM driver_routes dr
    JOIN drivers d ON dr.driver_id = d.id
    WHERE dr.route_id = $1
    AND d.is_active = true

    -- 🔥 only available drivers
    AND NOT EXISTS (
      SELECT 1 FROM subscriptions s
      WHERE s.driver_id = d.id
      AND s.status = 'ACTIVE'
    )
    `,
    [route_id]
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

const getAllSubscriptions = async () => {
  const result = await pool.query(
    `
    SELECT 
      s.id,
      s.status,

      u.name AS user_name,
      r.name AS route_name,

      d.name AS driver_name

    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    JOIN routes r ON s.route_id = r.id
    LEFT JOIN drivers d ON s.driver_id = d.id

    ORDER BY s.created_at DESC
    `
  );

  return result.rows;
};

const assignDriverManually = async (subscription_id, driver_id) => {
  // 🔹 Check subscription
  const sub = await pool.query(
    `SELECT * FROM subscriptions WHERE id = $1`,
    [subscription_id]
  );

  if (sub.rows.length === 0) {
    throw new Error("Subscription not found");
  }

  const user_id = sub.rows[0].user_id;

  // 🔹 Check driver
  const driver = await pool.query(
    `SELECT * FROM drivers WHERE id = $1`,
    [driver_id]
  );

  if (driver.rows.length === 0) {
    throw new Error("Driver not found");
  }

  // 🔥 Expire old ACTIVE
  await pool.query(
    `
    UPDATE subscriptions
    SET status = 'EXPIRED'
    WHERE user_id = $1 AND status = 'ACTIVE'
    `,
    [user_id]
  );

  // 🔹 Assign new
  const result = await pool.query(
    `
    UPDATE subscriptions
    SET driver_id = $1,
        status = 'ACTIVE'
    WHERE id = $2
    RETURNING *
    `,
    [driver_id, subscription_id]
  );

  return result.rows[0];
};

const getStatsData = async () => {
  const result = await pool.query(
    `
    SELECT 
      COUNT(*) FILTER (WHERE status = 'ACTIVE') AS active,
      COUNT(*) FILTER (WHERE status = 'WAITING') AS waiting,
      COUNT(*) FILTER (WHERE status = 'FAILED') AS failed
    FROM subscriptions
    `
  );

  return result.rows[0];
};

const updateComplaintStatus = async (complaint_id, status) => {
  const result = await pool.query(
    `UPDATE complaints
     SET status = $2
     WHERE id = $1
     RETURNING *`,
    [complaint_id, status]
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getAvailableDriversByRoute,
  verifyDriver,
  createPlan,
  createComplaint,
  getComplaints,
  getAnalytics,
  getAllSubscriptions,
  assignDriverManually,
  getStatsData,
  updateComplaintStatus,
};