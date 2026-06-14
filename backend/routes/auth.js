const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require('../models/UserSchema');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Signup route
router.post('/signup', async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("data received in backend:", req.body);
        const userExists = await User.findOne({ email });
        if(userExists){
        return res.status(400).json({ message: 'User already exists' });
        }
       const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save()
        console.log(" User saved to DB successfully");
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: 'error creating user' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email,});
        
    if (!user || user.password !== password) {
        return res.status(400).json({
        message: 'Invalid email or password'
    });
}
        res.status(200).json({
            message:'Login successful',
            user:{id: user._id, name: user.name, role: user.role, email: user.email}
        });
    }
    catch(err){
        res.status(500).json({message:'login error', error:err.message});
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email does not exist"
            });
        }
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        user.resetOTP = hashedOTP;
        user.resetOTPExpiry =
            Date.now() + 10 * 60 * 1000;
        user.otpVerified = false;
        await user.save();
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "UrbanSync Password Reset OTP",
            html: `
                <h2>Password Reset OTP</h2>
                <h1>${otp}</h1>
                <p>OTP valid for 10 minutes</p>`
        });
        res.json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// router.post("/verify-otp", verifyResetOTP);

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");
        if (
            user.resetOTP !== hashedOTP ||
            user.resetOTPExpiry < Date.now()
        ) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }
        user.otpVerified = true;
        await user.save();
        res.json({
            success: true,
            message: "OTP verified"
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (!user.otpVerified) {
            return res.status(400).json({
                message: "Verify OTP first"
            });
        }

        // SAVE NEW PASSWORD
       const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // clear otp
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;
        user.otpVerified = false;
        await user.save();
        res.json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
  }
});

module.exports = router;