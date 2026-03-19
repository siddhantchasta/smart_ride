const { createDriver, getDrivers } = require('../services/driver.service');
const { getDriverEarnings, getDriverPayments } = require('../services/driver.service');

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

const fetchDriverEarnings = async (req, res) => {
  try {
    const { driver_id } = req.params;

    const data = await getDriverEarnings(driver_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchDriverPayments = async (req, res) => {
  try {
    const { driver_id } = req.params;

    const data = await getDriverPayments(driver_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addDriver, fetchDrivers, fetchDriverEarnings, fetchDriverPayments };