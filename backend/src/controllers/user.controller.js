const { addUserLocation, getUserLocation } = require('../services/user.service');

const createLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await addUserLocation(userId, req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await getUserLocation(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createLocation, fetchLocation };