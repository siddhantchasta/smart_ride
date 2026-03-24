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

module.exports = { createLocation, fetchLocation };