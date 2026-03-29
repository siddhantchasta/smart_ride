const {
  assignDriverToRoute,
  getDriverRoutes,
} = require('../services/driverRoute.service');

const assignRoute = async (req, res) => {
  try {
    const { driver_id, route_id } = req.body;
    
    const data = await assignDriverToRoute(driver_id, route_id);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchDriverRoutes = async (req, res) => {
  try {
    const { driver_id } = req.params;

    const data = await getDriverRoutes(driver_id);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { assignRoute, fetchDriverRoutes };