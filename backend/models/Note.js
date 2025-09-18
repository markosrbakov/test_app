const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

// Оваа линија е клучна за да можеш да го увезеш во index.js
module.exports = Note;