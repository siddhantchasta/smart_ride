const pool = require("../config/db");

const getInvoiceHTML = async (req, res) => {
  try {
    const { id } = req.params;

    // Get invoice
    const invoiceResult = await pool.query(
      `SELECT * FROM invoices WHERE id = $1`,
      [id]
    );

    if (invoiceResult.rows.length === 0) {
      return res.status(404).send("Invoice not found");
    }

    const invoice = invoiceResult.rows[0];

    // Get user
    const userResult = await pool.query(
      `SELECT name, email FROM users WHERE id = $1`,
      [invoice.user_id]
    );

    const user = userResult.rows[0];

    // HTML TEMPLATE
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f5f5f7;
          padding: 40px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        h1 {
          text-align: center;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }
        .label {
          color: #666;
        }
        .value {
          font-weight: bold;
        }
        .divider {
          margin: 20px 0;
          border-top: 1px solid #eee;
        }
        .btn {
          display: block;
          width: fit-content;
          margin: 30px auto 0;
          padding: 10px 20px;
          background: black;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>SmartRide Invoice</h1>

        <div class="divider"></div>

        <div class="row">
          <span class="label">Invoice ID</span>
          <span class="value">${invoice.id}</span>
        </div>

        <div class="row">
          <span class="label">Date</span>
          <span class="value">${new Date(invoice.created_at).toLocaleString()}</span>
        </div>

        <div class="row">
          <span class="label">Customer</span>
          <span class="value">${user.name}</span>
        </div>

        <div class="row">
          <span class="label">Email</span>
          <span class="value">${user.email}</span>
        </div>

        <div class="divider"></div>

        <div class="row">
          <span class="label">Service</span>
          <span class="value">Ride Subscription</span>
        </div>

        <div class="row">
          <span class="label">Amount Paid</span>
          <span class="value">₹${invoice.amount}</span>
        </div>

        <div class="row">
          <span class="label">Status</span>
          <span class="value" style="color: green;">PAID</span>
        </div>

        <div class="divider"></div>

        <p style="text-align:center; color:#666;">
          Thank you for choosing SmartRide
        </p>

        <a href="#" onclick="window.print()" class="btn">Download / Print</a>
      </div>
    </body>
    </html>
    `;

    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating invoice");
  }
};

module.exports = { getInvoiceHTML };