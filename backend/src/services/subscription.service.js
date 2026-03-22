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
     (user_id, route_id, plan_id, start_date, end_date, status)
     VALUES ($1,$2,$3,$4,$5,'PENDING')
    RETURNING *`,
    [user_id, route_id, plan_id, start_date, end_date]
  );

  return result.rows[0];
};

const getUserSubscriptions = async (user_id) => {
  await pool.query(
    `UPDATE subscriptions
     SET status = 'EXPIRED',
         driver_id = NULL
     WHERE end_date < CURRENT_DATE
     AND status = 'ACTIVE'`
  );

  const result = await pool.query(
    `SELECT s.*, r.name as route_name, p.name as plan_name
     FROM subscriptions s
     JOIN routes r ON s.route_id = r.id
     JOIN plans p ON s.plan_id = p.id
     WHERE s.user_id = $1 AND s.status = 'ACTIVE'`,
    [user_id]
  );

  return result.rows;
};

const { sendNotification } = require('./notification.service');

const assignDriver = async (subscription_id) => {
  // Get route + user
  const sub = await pool.query(
    `SELECT route_id, user_id FROM subscriptions WHERE id = $1`,
    [subscription_id]
  );

  const route_id = sub.rows[0].route_id;
  const user_id = sub.rows[0].user_id;

  // Find available driver
  const driver = await pool.query(
    `
    SELECT d.id, d.name
    FROM driver_routes dr
    JOIN drivers d ON dr.driver_id = d.id
    WHERE dr.route_id = $1
    AND NOT EXISTS (
      SELECT 1 FROM subscriptions s
      WHERE s.driver_id = d.id AND s.status = 'ACTIVE'
    )
    LIMIT 1
    `,
    [route_id]
  );

  console.log("DRIVER FOUND:", driver.rows);

  if (driver.rows.length > 0) {
    const driver_id = driver.rows[0].id;
    const driver_name = driver.rows[0].name;

    // Assign driver + activate
    await pool.query(
      `
      UPDATE subscriptions
      SET driver_id = $1, status = 'ACTIVE'
      WHERE id = $2
      `,
      [driver_id, subscription_id]
    );

    // Notification: Driver assigned
    await sendNotification({
      user_id,
      message: `Driver ${driver_name} has been assigned to your route`,
      type: "DRIVER",
    });

  } else {
    // No driver → WAITING
    await pool.query(
      `
      UPDATE subscriptions
      SET status = 'WAITING', driver_id = NULL
      WHERE id = $1
      `,
      [subscription_id]
    );

    // Notification: Waiting
    await sendNotification({
      user_id,
      message: `We are assigning a driver. Please wait.`,
      type: "SYSTEM",
    });
  }
};

const getUserSubscriptionDetails = async (user_id) => {
  const result = await pool.query(
    `
    SELECT 
      s.id AS subscription_id,
      s.status,
      r.name AS route_name,

      d.name AS driver_name,
      d.phone AS driver_phone,

      v.vehicle_number,
      v.vehicle_type

    FROM subscriptions s
    JOIN routes r ON s.route_id = r.id

    LEFT JOIN drivers d ON s.driver_id = d.id
    LEFT JOIN vehicles v ON v.driver_id = d.id

    WHERE s.user_id = $1 AND s.status IN ('ACTIVE','WAITING')
    `,
    [user_id]
  );

  return result.rows[0];
};

const markSubscriptionFailed = async (subscription_id) => {
  await pool.query(
    `
    UPDATE subscriptions
    SET status = 'FAILED'
    WHERE id = $1
    `,
    [subscription_id]
  );
};

const getSubscriptionWithPlan = async (subscription_id) => {
  const result = await pool.query(
    `
    SELECT s.*, p.price
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    WHERE s.id = $1
    `,
    [subscription_id]
  );

  return result.rows[0];
};

module.exports = { createSubscription, getUserSubscriptions, assignDriver,getUserSubscriptionDetails, markSubscriptionFailed, getSubscriptionWithPlan };