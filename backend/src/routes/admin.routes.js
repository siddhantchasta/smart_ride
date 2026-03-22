const express = require('express');
const router = express.Router();

const { 
  fetchUsers,
  approveDriver,
  addPlan,
  addComplaint,
  fetchComplaints,
  updateComplaint,
  fetchAnalytics,
  fetchAllSubscriptions,
  assignDriverAdmin,
  getStats  
} = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/users', authMiddleware, adminMiddleware, fetchUsers);
router.get('/subscriptions', fetchAllSubscriptions);
router.post('/assign-driver', assignDriverAdmin);
router.get('/stats', getStats);

router.post(
  '/drivers/verify',
  authMiddleware,
  adminMiddleware,
  approveDriver
);

router.post(
  '/plans',
  authMiddleware,
  adminMiddleware,
  addPlan
);

// User creates complaint
router.post('/complaints', authMiddleware, addComplaint);

// Admin views all complaints
router.get(
  '/complaints',
  authMiddleware,
  adminMiddleware,
  fetchComplaints
);

router.get(
  '/analytics',
  authMiddleware,
  adminMiddleware,
  fetchAnalytics
);

router.put(
  '/complaints/status',
  authMiddleware,
  adminMiddleware,
  updateComplaint
);

module.exports = router;