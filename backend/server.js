const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());  
  

//Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected to UrbanSync_DB'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/uploaded_images', express.static('uploaded_images'));  

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});