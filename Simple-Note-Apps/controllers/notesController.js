/* eslint-disable spaced-comment */
const { nanoid } = require("nanoid");
const {
  loadNotes,
  addNotes,
  editNotes,
  deleteNotes,
} = require("../utils/notesFS");

module.exports = {
  index: (req, res) => {
    const notes = loadNotes();
    res.render("home", {
      layout: "layouts/main-layout",
      extractStyles: true,
      extractScripts: true,
      notes,
    });
  },
  create: (req, res) => {
    res.render("add-notes", {
      layout: "layouts/main-layout",
      extractStyles: true,
      extractScripts: true,
    });
  },
  edit: (req, res) => {
    let note = loadNotes();
    note = note.find((element) => element.id === req.params.id);
    res.render("edit-notes", {
      layout: "layouts/main-layout",
      extractStyles: true,
      extractScripts: true,
      note,
    });
  },
  store: (req, res) => {
    req.body.id = nanoid();
    req.body.createdAt = new Date();
    req.body.updatedAt = req.body.createdAt;
    req.body.img = req.file.filename;
    addNotes(req.body);
    res.redirect("/");
  },
  update: (req, res) => {
    editNotes(req);
    res.redirect("/");
  },
  destroy: (req, res) => {
    deleteNotes(req.params.id);
    res.redirect("/");
  },
};
