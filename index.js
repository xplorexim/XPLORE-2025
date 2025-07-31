import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files (CSS, JS, etc.)

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "XPLORE",
            address: "xplore@xim.edu.in"
        },
        to: "xplore@xim.edu.in",
        subject: "Sent from XPLORE website",
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };
    const confirmationMail = {
        from: {
            name: "XPLORE XIM",
            address: "xplore@xim.edu.in"
        },
        to: req.body.email,
        subject: "XPLORE feedback received",
        text: `Hi ${req.body.name},\n\nThank you for reaching out to XPLORE. We'll get back to you shortly.\n\n- Team XPLORE`,
    };    

    try {
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMail)
        ]);        
        res.redirect('/?success=true#contact'); 
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/?error=send#contact');
    }
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
// Export the Express API
export default app;
