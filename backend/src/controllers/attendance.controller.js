const {
  markAttendance,
  getUserAttendance,
} = require('../services/attendance.service');

const createAttendance = async (req, res) => {
  try {
    const data = await markAttendance(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAttendance = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await getUserAttendance(user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAttendance, fetchAttendance };