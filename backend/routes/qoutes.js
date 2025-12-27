import express from 'express';
import Quote from '../models/Quote.js';

const router = express.Router();

// Get all quotes or search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { text: { $regex: search, $options: 'i' } }
      : {};
    const quotes = await Quote.find(query).limit(50);
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

// POST /api/quotes
router.post('/', async (req, res) => {
  try {
    const { text, author, tags } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    const quote = new Quote({ text, author, tags });
    await quote.save();
    res.status(201).json({ message: 'Quote added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
