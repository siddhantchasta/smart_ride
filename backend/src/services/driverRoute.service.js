const pool = require('../config/db');

const assignDriverToRoute = async (driver_id, route_id) => {
  const result = await pool.query(
    `INSERT INTO driver_routes (driver_id, route_id)
     VALUES ($1, $2)
     RETURNING *`,
    [driver_id, route_id]
  );

  return result.rows[0];
};

const getDriverRoutes = async (driver_id) => {
  const result = await pool.query(
    `SELECT dr.*, r.name, r.start_location, r.end_location
     FROM driver_routes dr
     JOIN routes r ON dr.route_id = r.id
     WHERE dr.driver_id = $1 AND dr.is_active = true`,
    [driver_id]
  );

  return result.rows;
};

module.exports = { assignDriverToRoute, getDriverRoutes };