const express = require("express");
const router = express.Router();

const { getInvoiceHTML } = require("../controllers/invoice.controller");

router.get("/:id", getInvoiceHTML);

module.exports = router;
