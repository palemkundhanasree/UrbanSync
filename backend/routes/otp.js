const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/UserSchema');
const OTP = require('../models/OTPSchema');   

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    },
    tls: {
        servername:'smtp.gmail.com',
        rejectUnauthorized: false
    }
});

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Email address is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format. Please enter a valid email address (e.g., name@gmail.com)." 
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        const generatedOtp = crypto.randomInt(100000, 999999).toString();

        await OTP.findOneAndUpdate(
            { email: email.toLowerCase() },
            { otp: generatedOtp, createdAt: Date.now() },
            { upsert: true, new: true }
        );

        const mailOptions = {
            from: `"UrbanSync Support" <${process.env.EMAIL_USER}>`,
            to: email.toLowerCase(),
            subject: 'UrbanSync - Sign Up Verification Code',
            html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #131313; color: #f3e8d3; border-radius: 12px; max-width: 500px; margin: 0 auto;">
                    <h2 style="color: #baf087; text-align: center;">Verify Your Email</h2>
                    <p style="line-height: 1.5;">Thank you for registering with UrbanSync. Use the single-use authorization code below to complete your sign-up sequence. This code is strictly valid for **5 minutes**.</p>
                    <div style="background-color: #1a2e1a; padding: 15px; text-align: center; font-size: 2.2rem; font-weight: bold; color: #baf087; letter-spacing: 6px; border-radius: 8px; border: 1px solid rgba(186, 240, 135, 0.2); margin: 25px 0;">
                        ${generatedOtp}
                    </div>
                    <p style="font-size: 0.8rem; opacity: 0.5; text-align: center; margin-top: 30px;">If you didn't request this registration link, please ignore or delete this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(" Nodemailer Success Receipt:", info.messageId);
        console.log(" Accepted by server for delivery to:", info.accepted);
        res.status(200).json({ message: "Verification code sent to your email successfully!" });
    } catch (error) {
        console.error("Critical error inside /send-otp route:", error);
        res.status(500).json({ message: "Failed to dispatch authentication email code", error: error.message });
    }
});

router.post('/verify-signup', async (req, res) => {
    const { name, email, password, otp } = req.body;

    try {
        if (!email || !otp || !name || !password) {
            return res.status(400).json({ message: "Missing required registration form values." });
        }

        // 1. Fetch matching token document matching submission address context
        const otpRecord = await OTP.findOne({ email: email.toLowerCase() });

        // If no document exists, TTL index wiped it out or it wasn't requested
        if (!otpRecord) {
            return res.status(400).json({ message: "Verification code expired or missing. Please request a new code." });
        }

        // 2. Structural verification check comparison
        if (otpRecord.otp !== otp.trim()) {
            return res.status(400).json({ message: "Incorrect authorization code. Access denied." });
        }

        // 3. Code matches cleanly! Proceed with account instantiation
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password // Will handle hashing via mongoose pre-save hooks natively
        });

        await newUser.save();

        // 4. Wipe consumed temporary document out of OTP database tracking collection
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(201).json({
            message: "Account verified and registered successfully!",
            user: { name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error("Critical error inside /verify-signup route:", error);
        res.status(500).json({ message: "Account generation failure on system database layers", error: error.message });
    }
});

module.exports = router;
