const express = require('express');
const nodemailer = require('nodemailer');
const Greeting = require('../models/Greetings');
const path = require('path'); // Import the path module

const router = express.Router();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "manojtadikonda5@gmail.com",
    pass: "xbsotnvnwabpybnw" // Use an app-specific password for Gmail
  },
});

// POST: Send Greeting and Save to DB
router.post('/send', async (req, res) => {
  const { recipientEmail, greetingType, customMessage, selectedImage } = req.body;

  if (!recipientEmail || !selectedImage) {
    return res.status(400).json({ message: 'Recipient email and image are required.' });
  }

  try {
    // Send email using nodemailer
    const mailOptions = {
      from: 'manojtadikonda5@gmail.com',
      to: recipientEmail,
      subject: `${greetingType} Greetings!`,
      text: customMessage,
      html: `
        <h2>${greetingType} Greetings!</h2>
        <p>${customMessage}</p>
        <img src="cid:greetingImage" alt="${greetingType} Image" style="width:100%; max-width:600px;"/>
      `,
      attachments: [
        {
          filename: path.basename(selectedImage), // Extract the image file name
          path: path.resolve(__dirname, '../', selectedImage), // Resolve the full path
          cid: 'greetingImage', // Content ID for embedding the image in email
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Save greeting to MongoDB
    const newGreeting = new Greeting({
      recipientEmail,
      greetingType,
      customMessage,
      imagePath: selectedImage,
    });
    await newGreeting.save();

    res.status(200).json({ message: 'Greeting sent and saved successfully!' });
  } catch (error) {
    console.error('Error sending greeting:', error);
    res.status(500).json({ error: 'Failed to send greeting.' });
  }
});

module.exports = router;
