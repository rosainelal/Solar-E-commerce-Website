const express = require('express');
const maintenanceModel = require('./maintenanceModel'); // Import your model

const router = express.Router();

// Route for handling maintenance form submissions
router.post('/submit-maintenance-request', async (req, res) => {
  const { name, email, subject, productType, productId, phone, message } = req.body;

  try {
    const newMaintenanceRequest = new maintenanceModel({
      name,
      email,
      subject,
      productType,
      productId,
      phone,
      message
    });

    await newMaintenanceRequest.save();

    const mailOptions = {
        from: 'meenujkannan09@gmail.com',
        to: 'meenakshy10@gmail.com',
        subject: `Maintenance Request - ${subject}`,
        html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Product Type: ${productType}</p>
          <p>Product ID: ${productId}</p>
          <p>Phone: ${phone}</p>
          <p>Message: ${message}</p>
        `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error sending maintenance request');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Maintenance request submitted successfully');
        }
    });
    } catch (err) {
      console.error('Error submitting maintenance request:', err);
      res.status(500).send('Error submitting maintenance request');
    }
});
  

    // You can also send an email here using Nodemailer if needed



module.exports = router;
