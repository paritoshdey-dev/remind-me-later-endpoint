import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

// Reminder model
import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  method: { type: String, enum: ['SMS', 'Email'], required: true },
  remindAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// route
app.post('/api/reminders', async (req, res) => {
  const { date, time, message, method } = req.body;

  if (!date || !time || !message || !method) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const remindAt = new Date(`${date}T${time}`);
    const newReminder = new Reminder({ message, method, remindAt });
    await newReminder.save();

    res.status(201).json({ success: true, reminder: newReminder });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
