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

const { createDriver } = require('../services/driver.service');

const { sendNotification } = require('../services/notification.service');

const db = require("../config/db");

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

const createDriverAdmin = async (req, res) => {
  try {
    const driver = await createDriver(req.body);
    res.status(201).json(driver);
  } catch (err) {
    console.error("CREATE DRIVER ERROR:", err);
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

    const sub = await db.query(
      "SELECT user_id FROM subscriptions WHERE id = $1",
      [subscription_id]
    );

    const user_id = sub.rows[0].user_id;

    // SEND NOTIFICATION
    await sendNotification({
      user_id,
      message: "Driver assigned to your route",
      type: "DRIVER_ASSIGNED"
    });

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

    const q = await db.query(
      "SELECT user_id FROM queries WHERE id = $1",
      [query_id]
    );

    const user_id = q.rows[0].user_id;

    await sendNotification({
      user_id,
      message: "Your query has been resolved",
      type: "QUERY_RESOLVED"
    });

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

const approveRoute = async (req, res) => {
  const { request_id } = req.body;

  try {
    const request = await db.query(
      "SELECT * FROM route_requests WHERE id = $1",
      [request_id]
    );

    if (request.rows.length === 0) {
      return res.status(404).json({ error: "Request not found" });
    }

    const r = request.rows[0];

    // STEP 1: CHECK IF ROUTE ALREADY EXISTS
    const existingRoute = await db.query(
      `SELECT * FROM routes 
       WHERE LOWER(start_location) = LOWER($1) 
       AND LOWER(end_location) = LOWER($2)`,
      [r.pickup, r.drop]
    );

    if (existingRoute.rows.length > 0) {
      // Route already exists → just approve request
      await db.query(
        "UPDATE route_requests SET status = 'APPROVED' WHERE id = $1",
        [request_id]
      );

      await sendNotification({
        user_id: r.user_id,
        message: "Your route request has been approved",
        type: "ROUTE_APPROVED"
      });

      return res.json({
        message: "Route already exists, request approved",
        route: existingRoute.rows[0]
      });
    }

    // 🔥 STEP 2: INSERT NEW ROUTE (only if not exists)
    const startCoords = await getCoordinates(r.pickup);
    const endCoords = await getCoordinates(r.drop);
    const distance = await getDistance(r.pickup, r.drop);

    const newRoute = await db.query(
      `INSERT INTO routes 
      (name, start_location, end_location, total_seats, available_seats, is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        `${r.pickup} → ${r.drop}`,
        r.pickup,
        r.drop,
        4,
        4,
        true,
        startCoords.lat,
        startCoords.lng,
        endCoords.lat,
        endCoords.lng,
        distance.distance_value
      ]
    );

    await db.query(
      "UPDATE route_requests SET status = 'APPROVED' WHERE id = $1",
      [request_id]
    );

    res.json({
      message: "Route created and approved",
      route: newRoute.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to approve route" });
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
  createDriverAdmin,
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
  approveRoute,
  fetchRouteRequests
};