const {
  getAllUsers,
  getAvailableDriversByRoute,
  verifyDriver,
  createPlan,
  createComplaint, 
  getComplaints, 
  updateComplaintStatus,
  getAnalytics,
  getAllSubscriptions,
  assignDriverManually,
  getStatsData
} = require('../services/admin.service');

const fetchUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDriversByRouteController = async (req, res) => {
  try {
    const { route_id } = req.query;

    if (!route_id) {
      return res.status(400).json({ error: "Route ID required" });
    }

    const drivers = await getAvailableDriversByRoute(route_id);

    res.json(drivers);

  } catch (err) {
    console.error("GET DRIVERS ERROR:", err);
    res.status(500).json({ error: err.message });
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

const fetchAllSubscriptions = async (req, res) => {
  try {
    const data = await getAllSubscriptions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignDriverAdmin = async (req, res) => {
  try {
    const { subscription_id, driver_id } = req.body;

    const result = await assignDriverManually(
      subscription_id,
      driver_id
    );

    res.json({ message: "Driver assigned", data: result });

  } catch (err) {
    console.error("ADMIN ASSIGN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const data = await getStatsData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { complaint_id, status } = req.body;

    const data = await updateComplaintStatus(complaint_id, status);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchUsers,
  getDriversByRouteController,
  approveDriver,
  addPlan,
  addComplaint,
  fetchComplaints,
  fetchAnalytics,
  fetchAllSubscriptions,
  assignDriverAdmin,
  getStats,
  updateComplaint
};