const express = require('express');
const router = express.Router();
const Report = require('../models/ReportSchema');

router.post('/add', async (req, res) => {
    try {
        const { category, description, address, userId } = req.body;
        const newReport = new Report({
            category,
            description,
            address,
            userId
        });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit report', error });
    }   
});
router.get("/reports/:userId", async (req, res) => {
    try {
        const reports = await Report.find({
            userId: req.params.userId
        });
        res.status(200).json(reports);
    }
    catch(error){
        res.status(500).json({
            message: "Failed to fetch reports"
        });
    }
});

module.exports= router;