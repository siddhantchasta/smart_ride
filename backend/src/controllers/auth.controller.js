const { registerUser } = require('../services/auth.service');
const { loginUser } = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };