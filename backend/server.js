const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');



// Load environment variables
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection using mongoose
const mongoURI = process.env.DB_URI || "mongodb+srv://junahindig:Indig22104768!@cluster0.sdrwacr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(mongoURI); // No need for deprecated options
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();


// Routes
const userRoutes = require('./routes/user');

app.use('/api/users', userRoutes);

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
