const express = require('express');
const router = express.Router();

const { 
    addPayment, 
    fetchPayments, 
    fetchInvoices, 
    createPaymentOrder, 
    verifyPaymentController } = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create-order', createPaymentOrder);
router.post('/verify', authMiddleware,verifyPaymentController);
router.get('/invoices/:user_id', fetchInvoices);
router.get('/user/:user_id', fetchPayments);

module.exports = router;