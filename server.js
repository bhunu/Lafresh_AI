import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

const app = express()

app.use(cors())
app.use(express.json())

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again in 15 minutes.' },
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, message, type } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' })
  }

  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Harare',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111827;">
  <h2 style="color:#065f46;border-bottom:2px solid #065f46;padding-bottom:8px;margin-bottom:20px;">
    New Enquiry — La Fresh Website
  </h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:bold;width:140px;color:#374151;vertical-align:top;">Name:</td>
      <td style="padding:8px 0;color:#111827;">${esc(name)}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:bold;color:#374151;vertical-align:top;">Email:</td>
      <td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#065f46;">${esc(email)}</a></td>
    </tr>
    ${phone ? `
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:bold;color:#374151;vertical-align:top;">Phone:</td>
      <td style="padding:8px 0;color:#111827;">${esc(phone)}</td>
    </tr>` : ''}
    ${type ? `
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:bold;color:#374151;vertical-align:top;">Inquiry Type:</td>
      <td style="padding:8px 0;color:#111827;">${esc(type)}</td>
    </tr>` : ''}
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:bold;color:#374151;vertical-align:top;">Message:</td>
      <td style="padding:8px 0;color:#111827;white-space:pre-wrap;">${esc(message)}</td>
    </tr>
    <tr>
      <td style="padding:16px 12px 8px 0;font-weight:bold;color:#374151;vertical-align:top;">Sent at:</td>
      <td style="padding:16px 0 8px;color:#6b7280;font-size:13px;">${timestamp}</td>
    </tr>
  </table>
</div>
`

  try {
    await transporter.sendMail({
      from: '"La Fresh Website" <info@lafresh.co.zw>',
      to: 'marketing@lafresh.co.zw',
      replyTo: email,
      subject: `New Enquiry from ${name} — La Fresh Website`,
      html,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    res.status(500).json({ success: false, error: 'Failed to send message. Please try again.' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
