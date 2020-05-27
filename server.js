const express = require('express');
const { notes } = require('/Develop/db/db');
const PORT = process.env.PORT || 3001;
const app = express();

function findById(id, notesArray) {
  console.log("id = "+id);
  console.log("notesArray = "+notesArray);
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

app.get('/api/notes/:id', (req, res) => {
  console.log("id = "+req.params.id);
  console.log("notes = "+notes);
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});