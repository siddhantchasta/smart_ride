const { getPayments, getInvoices } = require('../services/payment.service');
const { createOrder } = require('../services/payment.service');
const { verifyPayment, savePayment, activateSubscription } = require('../services/payment.service');

const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await createOrder(amount);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const addPayment = async (req, res) => {
//   try {
//     const data = await createPayment(req.body);
//     res.status(201).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const fetchPayments = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getPayments(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchInvoices = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getInvoices(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      subscription_id,
      amount
    } = req.body;

    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment" });
    }

    const payment = await savePayment({
      user_id,
      subscription_id,
      amount,
      payment_id: razorpay_payment_id
    });

    await activateSubscription(subscription_id);

    res.json({
      message: "Payment successful & subscription activated",
      payment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentOrder, fetchPayments, fetchInvoices, verifyPaymentController };