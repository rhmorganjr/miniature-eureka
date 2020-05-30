const express = require('express');
const { notes } = require('./Develop/db/db');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

// Update the home route to return `index.html`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  console.log("get note to del; "+req.params.id);
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  notes.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const note = req.body;
});

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});