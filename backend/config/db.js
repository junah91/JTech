const mongoose = require('mongoose');


const mongoURI = process.env.DB_URI;

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    console.log('Connected to database:', mongoose.connection.name); // Logs the database name
  })
  .catch((err) => console.error('MongoDB connection error:', err));
