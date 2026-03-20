const { createRoute, getAllRoutes } = require('../services/routes.service');
const { findMatchingRoutes } = require('../services/routes.service');

const addRoute = async (req, res) => {
  try {
    const data = await createRoute(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchRoutes = async (req, res) => {
  try {
    const data = await getAllRoutes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMatchedRoutes = async (req, res) => {
  try {
    const userId = req.user.id;

    const routes = await findMatchingRoutes(userId);

    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addRoute, fetchRoutes, getMatchedRoutes };