//require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./models/Note'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vityanmorello_db_user:T2UWaASx2S5vPoyd@nurture.a1xjotx.mongodb.net/brziBeleski?retryWrites=true&w=majority&appName=nurture')
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/notes', async (req, res) => {
  console.log('GET /api/notes called'); // <-- лог за секој повик
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    console.log('Returning notes:', notes.length);
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
});

app.post('/api/notes', async (req, res) => {
  console.log('POST /api/notes called with body:', req.body); // <-- лог за payload
  try {
    const { content } = req.body;
    if (!content) {
      console.log('Content missing in request body!');
      return res.status(400).json({ message: 'Content is required' });
    }
    const newNote = new Note({ content });
    await newNote.save();
    console.log('Created new note:', newNote._id);
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Server error while creating a note' });
  }
});



// app.listen(PORT, () => {
//   console.log(`Серверот е успешно стартуван на http://localhost:${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});