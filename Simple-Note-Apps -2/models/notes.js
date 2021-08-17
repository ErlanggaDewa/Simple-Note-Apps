const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: String,
  createdAt: String,
  updatedAt: String,
  img: String,
});

const Note = mongoose.model("note", noteSchema);

module.exports = {
  loadNotes: () => Note.find(),
  addNotes: (req) => {
    req.body.createdAt = new Date();
    req.body.updatedAt = req.body.createdAt;
    req.body.img = req.file.filename;

    const noteCreated = new Note({
      ...req.body,
    });

    noteCreated.save((err) => {
      if (err) console.error(err);
    });
  },
  editNotes: (req) => {
    const { id } = req.params;
    const { title, text } = req.body;

    const { filename: img = "" } = req.file;

    Note.findByIdAndUpdate(id, {
      text,
      title,
      img,
      updatedAt: new Date(),
    }).exec();
  },
  deleteNotes: (id) => {
    Note.findByIdAndDelete(id).exec();
  },
};
