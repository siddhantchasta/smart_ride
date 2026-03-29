const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const routesRoutes = require('./routes/routes.routes');
const driverRoutes = require('./routes/driver.routes');
const driverRouteRoutes = require('./routes/driverRoute.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const paymentRoutes = require('./routes/payment.routes');
const adminRoutes = require('./routes/admin.routes');
const notificationRoutes = require('./routes/notification.routes');
const planRoutes = require('./routes/plan.routes');
const invoiceRoutes = require("./routes/invoice.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/", invoiceRoutes);
app.use('/api/routes', routesRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/driver-routes', driverRouteRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/api/invoice", require("./routes/invoice.routes"));
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;