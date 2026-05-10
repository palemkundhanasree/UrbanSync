const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/ReportSchema');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploaded_images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res) => {
    console.log('API HIT');
    try {
        console.log('Received data:', req.body);
        console.log('Received file:', req.file);

        const { category, description, address, userId } = req.body;
        const newReport = new Report({
            category,
            description,
            address,
            userId,
            image: req.file ? req.file.path : null
        });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error submitting report:', error);   
        res.status(500).json({ message: 'Failed to submit report', error: error.message });
    }   
});

module.exports= router;