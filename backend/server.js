const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming correct path
const userRoutes = require('./routes/user'); // Assuming correct path

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.DB_URI;

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    console.log('Connected to database:', mongoose.connection.name); // Logs the database name
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Test user creation (use only in development)
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter username: ', (username) => {
  rl.question('Enter password: ', (password) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      const newUser = new User({
        username,
        password: hashedPassword, // Store the hashed password
      });

      newUser.save()
        .then(() => {
          console.log(`User '${username}' has been successfully inserted into the database!`);
          mongoose.disconnect();
          rl.close();
        })
        .catch((err) => {
          console.error('Error inserting user:', err);
          mongoose.disconnect();
          rl.close();
        });
    });
  });
});
