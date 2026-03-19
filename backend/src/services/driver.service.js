const pool = require('../config/db');

const createDriver = async (data) => {
  const { name, phone, license_number } = data;

  const result = await pool.query(
    `INSERT INTO drivers (name, phone, license_number)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, phone, license_number]
  );

  return result.rows[0];
};

const getDrivers = async () => {
  const result = await pool.query(`SELECT * FROM drivers`);
  return result.rows;
};

module.exports = { createDriver, getDrivers };