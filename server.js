require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define schema and model
const EntrySchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: Date, default: Date.now },
});
const Entry = mongoose.model('Entry', EntrySchema);


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

app.post('/add-entry', async (req, res) => {
  try {
    const { type, amount, description, category } = req.body;
    const newEntry = new Entry({ type, amount, description, category });
    await newEntry.save();
    res.status(201).json({ message: 'Entry saved successfully!' });
  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

app.get('/budget-data', async (req, res) => {
  try {
    const entries = await Entry.find(); // Fetch all entries from MongoDB
    res.status(200).json(entries); // Send data back to the client
  } catch (err) {
    console.error('Error fetching budget data:', err);
    res.status(500).json({ error: 'Failed to fetch budget data' });
  }
});

app.delete('/clear-data', async (req, res) => {
  try {
    await Entry.deleteMany(); // This deletes all documents in the collection
    res.status(200).json({ message: 'All data cleared successfully!' });
  } catch (err) {
    console.error('Error clearing data:', err);
    res.status(500).json({ error: 'Failed to clear data' });
  }
});

app.delete('/delete-entry/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    const deletedEntry = await Entry.findByIdAndDelete(id); // Delete the specific entry by ID

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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('MONGO_URI:', process.env.MONGO_URI);
});

