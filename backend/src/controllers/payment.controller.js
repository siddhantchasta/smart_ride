const { createPayment, getPayments, getInvoices } = require('../services/payment.service');

const addPayment = async (req, res) => {
  try {
    const data = await createPayment(req.body);
    res.status(201).json(data);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPayment, fetchPayments, fetchInvoices };