const express = require('express');
const router = express.Router();

const { addPayment, fetchPayments, fetchInvoices } = require('../controllers/payment.controller');

router.post('/', addPayment);
router.get('/:user_id', fetchPayments);
router.get('/invoices/:user_id', fetchInvoices);

module.exports = router;