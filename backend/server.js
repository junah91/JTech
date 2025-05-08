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

// Routes (if you have any backend routes)
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Serve static frontend files (HTML, CSS, JS) in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'frontend' directory
  app.use(express.static(path.join(__dirname, '../frontend')));  // Adjust path to match your structure
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));  // Serve the index.html from the frontend folder
  });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
