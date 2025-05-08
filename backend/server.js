const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.DB_URI || "mongodb+srv://your-mongo-uri";
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Serve frontend (HTML) in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'frontend' directory outside of 'backend'
  app.use(express.static(path.join(__dirname, '../frontend')));  // Adjusted to point to the 'frontend' directory
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));  // Send index.html from 'frontend'
  });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
