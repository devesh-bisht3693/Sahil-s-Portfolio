require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required (name, email, subject, message)',
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
  }

  try {
    // Create transporter
    // For production, use real SMTP credentials in .env
    // For development/testing, this uses Ethereal (fake SMTP)
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Production: use configured SMTP
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: use Ethereal test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER || 'noreply@portfolio.com'}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.RECIPIENT_EMAIL || 'sahilchauhan@email.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 24px;">New Portfolio Enquiry</h1>
          </div>
          <div style="padding: 32px 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #0891b2;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <h3 style="margin: 0 0 12px; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
              <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #0f172a; line-height: 1.6;">
                ${message.replace(/\n/g, '<br />')}
              </div>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
            Sent from Sahil Chauhan's portfolio contact form
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // In dev mode, log the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('📧 Preview email at:', previewUrl);
    }

    console.log(`✅ Email sent: ${info.messageId}`);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📫 Contact endpoint: POST http://localhost:${PORT}/api/contact`);
});

