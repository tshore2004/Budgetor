require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const authenticateToken = require('./auth');

// Middleware
app.use(cors());
app.use(express.json());

// Define schema and model
const EntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, 
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: Date, default: Date.now },
});
const Entry = mongoose.model('Entry', EntrySchema);


app.get('/auth/anonymous', (req, res) => {
  const anonymousUserId = new mongoose.Types.ObjectId(); // Unique ID
  const token = jwt.sign({ userId: anonymousUserId }, SECRET, { expiresIn: '30d' }); // lasts 30 days
  res.json({ token });
});

app.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.send(
      `<h1>Saved Entries:</h1><pre>${JSON.stringify(entries, null, 2)}</pre>`
    );
  } catch (err) {
    res.send('<h1>Error fetching entries</h1>');
  }
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/add-entry', authenticateToken, async (req, res) => {
  try {
    const { type, amount, description, category } = req.body;
    const userId = req.userId;

    const newEntry = new Entry({ userId, type, amount, description, category });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.get('/budget-data', authenticateToken, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId });
    
    res.status(200).json(entries); // Send data back to the client
  } catch (err) {
    console.error('Error fetching budget data:', err);
    res.status(500).json({ error: 'Failed to fetch budget data' });
  }
});

app.delete('/clear-data', authenticateToken, async (req, res) => {
  try {
    await Entry.deleteMany({ userId: req.userId }); // This deletes all documents in the collection
    res.status(200).json({ message: 'All data cleared successfully!' });
  } catch (err) {
    console.error('Error clearing data:', err);
    res.status(500).json({ error: 'Failed to clear data' });
  }
});

app.delete('/delete-entry/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    const deletedEntry = await Entry.findByIdAndDelete({ _id: id, userId: req.userId }); // Delete the specific entry by ID

    if (deletedEntry) {
      res.status(200).json({ message: 'Entry deleted successfully!', deletedEntry });
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (err) {
    console.error('Error deleting entry:', err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // or MONGODB_URI, consistent!
    console.log('MongoDB connected successfully');

    // Add connection event listeners here (optional but helpful)
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log('MONGO_URI:', process.env.MONGO_URI);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();

