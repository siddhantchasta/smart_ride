const {
  getNotifications,
} = require('../services/notification.service');

const fetchNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getNotifications(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchNotifications };