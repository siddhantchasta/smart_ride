const {
  getAllUsers,
  getAvailableDriversByRoute,
  verifyDriver,
  createPlan,
  getAnalytics,
  getAllSubscriptions,
  assignDriverManually,
  getStatsData, 
  createQuery, 
  getQueries,
  getUserQueries, 
  resolveQuery, 
  createRouteRequest, 
  getRouteRequests
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

const addQuery = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { message } = req.body;

    const data = await createQuery({ user_id, message });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchQueries = async (req, res) => {
  try {
    const data = await getQueries();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchUserQueries = async (req, res) => {
  try {
    const user_id = req.user.id;

    const data = await getUserQueries(user_id);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markQueryResolved = async (req, res) => {
  try {
    const { query_id } = req.body;

    const data = await resolveQuery(query_id);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRouteRequest = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { pickup, drop } = req.body;

    const data = await createRouteRequest({
      user_id,
      pickup,
      drop,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchRouteRequests = async (req, res) => {
  try {
    const data = await getRouteRequests();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  fetchUsers,
  getDriversByRouteController,
  approveDriver,
  addPlan,
  fetchAnalytics,
  fetchAllSubscriptions,
  assignDriverAdmin,
  getStats, 
  addQuery, 
  fetchQueries,
  fetchUserQueries,
  markQueryResolved, 
  addRouteRequest, 
  fetchRouteRequests
};