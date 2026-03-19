const {
  sendNotification,
  getNotifications,
} = require('../services/notification.service');

const createNotification = async (req, res) => {
  try {
    const data = await sendNotification(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchNotifications = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getNotifications(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNotification, fetchNotifications };