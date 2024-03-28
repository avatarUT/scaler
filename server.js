const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email'  // Your Gmail email address
        pass: 'password'  // your password (use environment variables in production)
    }
});

// Route to send confirmation email
app.post('/send-email', (req, res) => {
    const { email, cabName } = req.body;

    const mailOptions = {
        from: 'email',  // Sender email
        to: email,  // Receiver email
        subject: 'Booking Confirmation',
        text: `Booking confirmed for ${cabName}!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent');
        }
    });
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
