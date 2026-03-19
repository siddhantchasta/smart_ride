const pool = require('../config/db');

const sendNotification = async (data) => {
  const { user_id, message, type } = data;

  // simulate sending
  console.log(`Sending ${type} to user ${user_id}: ${message}`);

  const result = await pool.query(
    `INSERT INTO notifications (user_id, message, type)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [user_id, message, type]
  );

  return result.rows[0];
};

const getNotifications = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

module.exports = { sendNotification, getNotifications };