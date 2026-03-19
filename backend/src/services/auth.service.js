const pool = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

module.exports = { registerUser };