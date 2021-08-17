const express = require("express");
const multer = require("multer");
const {
  index,
  create,
  store,
  edit,
  update,
  destroy,
} = require("../controllers/notesController");

const upload = multer({ dest: "public/images" });
const router = express.Router();

router
  .get("/", index)
  .post("/", upload.single("image-backgroud"), store)
  .get("/:id/edit", edit)
  .delete("/:id", destroy);

router.put("/:id", upload.single("image-backgroud"), update);

router.get("/add-notes", create);

module.exports = router;
