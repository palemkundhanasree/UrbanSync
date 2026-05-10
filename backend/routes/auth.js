const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

// Signup route
router.post('/signup', async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("data received in backend:", req.body);

        const userExists = await User.findOne({ email });

        if(userExists){
        return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password, role });
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

        if(!user || user.password !== password){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({
            message:'Login successful',
            user:{id: user._id, name: user.name, role: user.role}
        });
    }
    catch(err){
        res.status(500).json({message:'login error', error:err.message});
    }
});
module.exports = router;