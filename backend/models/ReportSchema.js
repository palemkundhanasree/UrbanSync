const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Pothole', 'Drainage', 'Street Lights', 'Barking Dogs', 'Water Problem']
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'in progress','Escalated', 'resolved']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);