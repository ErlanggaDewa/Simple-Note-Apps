/* eslint-disable spaced-comment */
const {
  loadNotes,
  addNotes,
  editNotes,
  deleteNotes,
} = require("../models/notes");

module.exports = {
  index: async (req, res) => {
    const notes = await loadNotes();
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
  store: (req, res) => {
    addNotes(req);
    res.redirect("/");
  },
  edit: async (req, res) => {
    let note = await loadNotes();
    note = note.find((element) => element.id === req.params.id);
    res.render("edit-notes", {
      layout: "layouts/main-layout",
      extractStyles: true,
      extractScripts: true,
      note,
    });
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
