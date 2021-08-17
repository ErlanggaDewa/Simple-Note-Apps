const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    extractStyles: true,
    extractScripts: true,
  });
});

module.exports = router;
