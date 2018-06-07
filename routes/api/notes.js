const express = require("express");
const router = express.Router();

// @route GET api/notes/test
// @desc Tests notes route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Notes works" }));

module.exports = router;
