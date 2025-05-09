const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Sign Up Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  
  res.status(201).json({ message: 'User registered successfully' });
});

// Sign In Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  res.json({ message: 'Login successful' });
});

module.exports = router;
