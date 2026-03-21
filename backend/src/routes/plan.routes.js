const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM plans`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

module.exports = router;