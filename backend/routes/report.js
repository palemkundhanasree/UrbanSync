const express = require('express');
const router = express.Router();
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Report = require('../models/ReportSchema');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'reports',
        allowedFormats: ['jpg', 'png', 'gif']
    },
});

const upload = multer({ storage});

router.post('/add', upload.single('image'), async (req, res) => {
    console.log('API HIT');
    try {
        console.log('Received data:', req.body);
        console.log('Received file:', req.file);

        const { category, description, address, userId, latitude, longitude} = req.body;
        const newReport = new Report({
            category,
            description,
            address,
            latitude,
            longitude,
            userId,
            status: 'Pending',
            image: req.file ? req.file.path : null
        });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error submitting report:', error);   
        res.status(500).json({ message: 'Failed to submit report', error: error.message });
    }   
});


router.get('/user/:userId', async (req, res) => {
    try{
        const reports = await Report.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(reports);
    }
    catch(error){
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
    }
});
module.exports= router;