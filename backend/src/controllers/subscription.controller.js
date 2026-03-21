const {
  createSubscription,
  getUserSubscriptions, getUserSubscriptionDetails
} = require('../services/subscription.service');

const addSubscription = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.user.id,
    };

    const result = await createSubscription(data);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const fetchUserDetails = async (req, res) => {
  try {
    const { user_id } = req.params;

    const data = await getUserSubscriptionDetails(user_id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSubscription, fetchSubscriptions, fetchUserDetails };