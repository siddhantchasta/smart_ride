const pool = require('../config/db');

const createPayment = async (data) => {
  const { user_id, subscription_id, amount, transaction_id } = data;

  const paymentResult = await pool.query(
    `INSERT INTO payments 
    (user_id, subscription_id, amount, payment_status, transaction_id, paid_at)
    VALUES ($1,$2,$3,'SUCCESS',$4,NOW())
    RETURNING *`,
    [user_id, subscription_id, amount, transaction_id]
  );

  const payment = paymentResult.rows[0];

  await pool.query(
    `INSERT INTO invoices (user_id, subscription_id, amount, invoice_url)
     VALUES ($1,$2,$3,$4)`,
    [
      user_id,
      subscription_id,
      amount,
      `invoice-${payment.id}` 
    ]
  );

  return payment;
};

const getPayments = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM payments WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

const getInvoices = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM invoices WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

module.exports = { createPayment, getPayments, getInvoices};