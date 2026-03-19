const { createDriver, getDrivers } = require('../services/driver.service');

const addDriver = async (req, res) => {
  try {
    const data = await createDriver(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchDrivers = async (req, res) => {
  try {
    const data = await getDrivers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addDriver, fetchDrivers };