const { getAllUsers } = require('../services/admin.service');
const { verifyDriver } = require('../services/admin.service');
const { createPlan } = require('../services/admin.service');
const { createComplaint, getComplaints } = require('../services/admin.service');
const { getAnalytics } = require('../services/admin.service');

const fetchUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveDriver = async (req, res) => {
  try {
    const { driver_id } = req.body;

    const data = await verifyDriver(driver_id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPlan = async (req, res) => {
  try {
    const data = await createPlan(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComplaint = async (req, res) => {
  try {
    const data = await createComplaint(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchComplaints = async (req, res) => {
  try {
    const data = await getComplaints();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAnalytics = async (req, res) => {
  try {
    const data = await getAnalytics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchUsers,
  approveDriver,
  addPlan,
  addComplaint,
  fetchComplaints,
  fetchAnalytics
};