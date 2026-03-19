const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const routesRoutes = require('./routes/routes.routes');
const driverRoutes = require('./routes/driver.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/routes', routesRoutes);
app.use('/api/drivers', driverRoutes);

module.exports = app;