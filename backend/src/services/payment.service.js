const pool = require('../config/db');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const { sendPaymentEmail } = require('./email.service');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// const createPayment = async (data) => {
//   const { user_id, subscription_id, amount, transaction_id } = data;

//   const paymentResult = await pool.query(
//     `INSERT INTO payments 
//     (user_id, subscription_id, amount, payment_status, transaction_id, paid_at)
//     VALUES ($1,$2,$3,'SUCCESS',$4,NOW())
//     RETURNING *`,
//     [user_id, subscription_id, amount, transaction_id]
//   );

//   const payment = paymentResult.rows[0];

//   await pool.query(
//     `INSERT INTO invoices (user_id, subscription_id, amount, invoice_url)
//      VALUES ($1,$2,$3,$4)`,
//     [
//       user_id,
//       subscription_id,
//       amount,
//       `invoice-${payment.id}` 
//     ]
//   );

//   return payment;
// };

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

const createOrder = async (amount) => {
  const options = {
    amount: amount, // paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  };

  const order = await razorpay.orders.create(options);
  return order;
};

const verifyPayment = (order_id, payment_id, signature) => {
  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
};

const savePayment = async (data) => {
  const { user_id, subscription_id, amount, payment_id, invoice_id } = data;

  // save payment
  const paymentResult = await pool.query(
    `INSERT INTO payments 
    (user_id, subscription_id, amount, payment_status, transaction_id, paid_at)
    VALUES ($1,$2,$3,'SUCCESS',$4,NOW())
    RETURNING *`,
    [user_id, subscription_id, amount, payment_id]
  );

  const payment = paymentResult.rows[0];

  const baseUrl = process.env.BASE_URL;

  const invoiceResult = await pool.query(
    `INSERT INTO invoices (user_id, subscription_id, amount)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [
      user_id,
      subscription_id,
      amount,
    ]
  );

  const invoice = invoiceResult.rows[0];
  const invoiceUrl = `${baseUrl}/invoice/${invoice.id}`;

  // fetch user details
  const userResult = await pool.query(
    `SELECT name, email FROM users WHERE id = $1`,
    [user_id]
  );

  const user = userResult.rows[0];

  // send email
  await sendPaymentEmail(user.email, user.name, amount, invoiceUrl);

  return payment;
};

// const activateSubscription = async (subscription_id) => {
//   await pool.query(
//     `UPDATE subscriptions 
//      SET status = 'ACTIVE'
//      WHERE id = $1`,
//     [subscription_id]
//   );
// };

module.exports = { getPayments, getInvoices, createOrder, verifyPayment, savePayment};