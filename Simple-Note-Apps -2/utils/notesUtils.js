const fs = require("fs");
const path = require("path");

const dirPath = path.resolve(__dirname, "../data");
const dataPath = path.resolve(dirPath, "notes.json");

if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]", "utf-8");

const loadNotes = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const notes = JSON.parse(fileBuffer);
  return notes;
};

const saveNotes = (notes) => {
  fs.writeFileSync(dataPath, JSON.stringify(notes));
};

const addNotes = (note) => {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
};

const editNotes = (req) => {
  const notes = loadNotes();
  const { title, text, updatedAt = new Date() } = req.body;

  const { filename: img = "" } = req.file;

  const index = notes.findIndex((element) => element.id === req.params.id);
  notes[index] = {
    ...notes[index],
    title,
    text,
    updatedAt,
    img,
  };

  saveNotes(notes);
};

const deleteNotes = (id) => {
  const notes = loadNotes();
  notes.splice(
    notes.findIndex((element) => element.id === id),
    1
  );
  saveNotes(notes);
};
module.exports = { loadNotes, addNotes, editNotes, deleteNotes };
