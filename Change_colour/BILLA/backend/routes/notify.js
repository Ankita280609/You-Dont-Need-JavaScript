const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmid');
const sendEmail = require('../services/emailService');


router.use(protect);

router.post('/test', async (req, res) => {
  try {
    const user = req.user; 

    const subject = 'This is a test email from BILLA!';
    const text = `Hello ${user.name}, this is a test notification.`;
    const html = `<b>Hello ${user.name},</b><p>This is a test notification.</p>`;

    await sendEmail({
      to: user.email,
      subject: subject,
      text: text,
      html: html,
    });

    res.status(200).json({ msg: 'Test email sent successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;