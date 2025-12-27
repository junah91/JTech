// models/task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: 'todo' }, // 'todo', 'progress', 'done'
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', taskSchema);
