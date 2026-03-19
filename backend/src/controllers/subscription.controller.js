const {
  createSubscription,
  getUserSubscriptions,
} = require('../services/subscription.service');

const addSubscription = async (req, res) => {
  try {
    const data = await createSubscription(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchSubscriptions = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getUserSubscriptions(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSubscription, fetchSubscriptions };