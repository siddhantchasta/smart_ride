const express = require('express');
const router = express.Router();

const { 
    addPayment, 
    fetchPayments, 
    fetchInvoices, 
    createPaymentOrder, 
    verifyPaymentController } = require('../controllers/payment.controller');

router.get('/:user_id', fetchPayments);
router.get('/invoices/:user_id', fetchInvoices);
router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPaymentController);

module.exports = router;