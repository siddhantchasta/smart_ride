const pool = require('../config/db');

const createSubscription = async (data) => {
  const { user_id, route_id, plan_id, start_date, end_date } = data;

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

module.exports = { createSubscription, getUserSubscriptions };