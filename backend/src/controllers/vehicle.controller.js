const db = require("../config/db");

const createVehicle = async (req, res) => {
  try {
    const { driver_id, vehicle_number, vehicle_type, capacity } = req.body;

    const result = await db.query(
      `INSERT INTO vehicles 
      (driver_id, vehicle_number, vehicle_type, capacity, is_active)
      VALUES ($1,$2,$3,$4,true)
      RETURNING *`,
      [driver_id, vehicle_number, vehicle_type, capacity]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.log("CREATE VEHICLE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createVehicle };