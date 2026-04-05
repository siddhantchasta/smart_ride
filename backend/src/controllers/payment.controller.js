const { getPayments, getInvoices } = require('../services/payment.service');
const { createOrder } = require('../services/payment.service');
const {
  verifyPayment,
  savePayment,
  sendPaymentSuccessEmail,
} = require('../services/payment.service');
const { assignDriver, markSubscriptionFailed } = require('../services/subscription.service');
const { sendNotification } = require('../services/notification.service');
const { getSubscriptionWithPlan } = require("../services/subscription.service");

const createPaymentOrder = async (req, res) => {
  try {
    const { subscription_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({ error: "Subscription ID required" });
    }

    const subscription = await getSubscriptionWithPlan(subscription_id);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const amount = subscription.price * 100; // paise
    const order = await createOrder(amount);

    res.json(order);

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

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
    console.error("VERIFY ERROR FULL:", error);
    res.status(500).json({ error: error.message });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      subscription_id,
    } = req.body;

    const user_id = req.user.id;

    // Verify signature
    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      await markSubscriptionFailed(subscription_id);
      return res.status(400).json({ error: "Invalid payment" });
    }

    const subscription = await getSubscriptionWithPlan(subscription_id);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const amount = subscription.price;

    const { payment, user, invoiceUrl } = await savePayment({
      user_id,
      subscription_id,
      amount,
      payment_id: razorpay_payment_id,
    });

    await assignDriver(subscription_id);

    res.json({
      message: "Payment successful & subscription activated",
      payment,
    });

    Promise.allSettled([
      sendNotification({
        user_id,
        message: `Payment successful for ₹${amount}`,
        type: "PAYMENT",
      }),
      sendPaymentSuccessEmail({
        user,
        amount,
        invoiceUrl,
      }),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.error("POST PAYMENT TASK ERROR:", result.reason);
        }
      });
    });

  } catch (error) {
    console.error("VERIFY ERROR FULL:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentOrder, fetchPayments, fetchInvoices, verifyPaymentController };
