import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  tags: [String], // e.g. ["focus", "motivation"]
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quote', quoteSchema);
