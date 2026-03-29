const db = require("../config/db");

const { addUserLocation, getUserLocation } = require('../services/user.service');

// const createLocation = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const data = await addUserLocation({
//       user_id: userId,
//       ...req.body
//     });

//     res.status(201).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const createLocation = async (req, res) => {
  try {
    const userId = req.user.id;

    const { route_id } = req.body;

    if (!route_id) {
      return res.status(400).json({
        error: "route_id is required",
      });
    }

    const data = await addUserLocation({
      user_id: userId,
      route_id,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const fetchLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await getUserLocation(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createLocation, fetchLocation, getMe };