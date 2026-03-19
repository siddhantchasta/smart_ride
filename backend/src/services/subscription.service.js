const pool = require('../config/db');

const createSubscription = async (data) => {
  const { user_id, route_id, plan_id, start_date, end_date } = data;

  // 🔒 CHECK existing active subscription
  const existing = await pool.query(
    `SELECT * FROM subscriptions 
     WHERE user_id = $1 AND status = 'ACTIVE'`,
    [user_id]
  );

  if (existing.rows.length > 0) {
    throw new Error("User already has an active subscription");
  }

  const result = await pool.query(
    `INSERT INTO subscriptions 
    (user_id, route_id, plan_id, start_date, end_date)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [user_id, route_id, plan_id, start_date, end_date]
  );

  return result.rows[0];
};

const getUserSubscriptions = async (user_id) => {
  const result = await pool.query(
    `SELECT s.*, r.name as route_name, p.name as plan_name
     FROM subscriptions s
     JOIN routes r ON s.route_id = r.id
     JOIN plans p ON s.plan_id = p.id
     WHERE s.user_id = $1`,
    [user_id]
  );

  return result.rows;
};

const getUserSubscriptionDetails = async (user_id) => {
  const result = await pool.query(
    `
    SELECT 
      s.id AS subscription_id,
      r.name AS route_name,

      d.name AS driver_name,
      d.phone AS driver_phone,
      d.verification_status,

      v.vehicle_number,
      v.vehicle_type

    FROM subscriptions s
    JOIN routes r ON s.route_id = r.id
    JOIN driver_routes dr ON dr.route_id = r.id
    JOIN drivers d ON dr.driver_id = d.id
    LEFT JOIN vehicles v ON v.driver_id = d.id

    WHERE s.user_id = $1 AND s.status = 'ACTIVE'
    `,
    [user_id]
  );

  return result.rows[0];
};

module.exports = { createSubscription, getUserSubscriptions, getUserSubscriptionDetails };