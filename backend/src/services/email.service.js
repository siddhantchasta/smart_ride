const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPaymentEmail = async (to, name, amount) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Payment Successful",
      html : `
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

                <p>Your subscription is now active. 🎉</p>

                <p style="margin-top:20px;">If you have any questions, feel free to reach out.</p>

                <p style="margin-top:20px;">– SmartRide Team 🚗</p>
                </div>

            </div>
        </div>`
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err.message);
  }
};

module.exports = { sendPaymentEmail };