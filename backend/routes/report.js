const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Report = require('../models/ReportSchema');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'reports',
        allowedFormats: ['jpg', 'png', 'gif']
    },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        console.log('Received data:', req.body);
        console.log('Received file:', req.file);

        const { category, description, address, userId, latitude, longitude } = req.body;
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
    try {
        const reports = await Report.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(reports);
    }
    catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    }
    catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
    }
});

router.put('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const reportId = req.params.id;

        const allowedStatuses = ['Pending', 'In Progress', 'Resolved'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({
            message: 'Report status updated successfully',
            report: updatedReport 
    });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({ message: 'Failed to update report status', error: error.message });
    }
});

module.exports = router;
