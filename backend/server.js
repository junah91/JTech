// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import readline from 'readline';

import User from './models/User.js';
import userRoutes from './routes/user.js';
import taskRoutes from './routes/taskRoutes.js';

import quoteRoutes from './routes/quotes.js';
app.use('/api/quotes', quoteRoutes);


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// CLI for creating user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter username: ', (username) => {
  rl.question('Enter password: ', (password) => {
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const newUser = new User({ username, password: hashedPassword });
      return newUser.save();
    })
    .then(() => {
      console.log(`✅ User '${username}' created successfully`);
      mongoose.disconnect();
      rl.close();
    })
    .catch((err) => {
      console.error('❌ Error creating user:', err);
      mongoose.disconnect();
      rl.close();
    });
  });
});
