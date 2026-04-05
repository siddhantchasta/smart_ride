const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Missing EMAIL_USER or EMAIL_PASS configuration');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendPaymentEmail = async (to, name, amount, invoiceUrl) => {
  try {
    const transporter = createTransporter();
    const html = `
       <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
            <div style="max-width:500px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                
                <div style="background:#4CAF50; color:white; padding:20px; text-align:center;">
                <h2 style="margin:0;">Payment Successful</h2>
                </div>

                <div style="padding:20px; color:#333;">
                <p>Hi <b>${name}</b>,</p>

                <p>Your payment of <b>₹${amount}</b> has been successfully processed.</p>

                <div style="background:#f1f3f5; padding:15px; border-radius:8px; margin:15px 0;">
                    <p style="margin:0;"><b>Amount:</b> ₹${amount}</p>
                    <p style="margin:0;"><b>Status:</b> Successful</p>
                </div>

                ${invoiceUrl ? `
                <div style="text-align:center; margin-top:20px;">
                  <a href="${invoiceUrl}" 
                    style="
                      background:#000;
                      color:#fff;
                      padding:10px 20px;
                      text-decoration:none;
                      border-radius:6px;
                      display:inline-block;
                      font-size:14px;
                    ">
                    Download Invoice
                  </a>
                </div>` : ''}

                <p>Your subscription is now active.</p>

                <p style="margin-top:20px;">If you have any questions, feel free to reach out.</p>

                <p style="margin-top:20px;">- SmartRide Team</p>
                </div>

            </div>
        </div>`;

    const info = await transporter.sendMail({
      from: `"Smart Ride" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Payment Successful",
      html
    });

    return info;
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
};

module.exports = { sendPaymentEmail };
