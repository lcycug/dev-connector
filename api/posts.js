const express = require("express");
const router = express.Router();

/**
 * @router  /api/posts/test
 * @desc    Router posts test
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
