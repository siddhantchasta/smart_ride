const express = require('express');
const router = express.Router();

const {
  createAttendance,
  fetchAttendance,
} = require('../controllers/attendance.controller');

router.post('/', createAttendance);
router.get('/:user_id', fetchAttendance);

module.exports = router;