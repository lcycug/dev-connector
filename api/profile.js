const express = require("express");
const router = express.Router();

/**
 * @router  /api/profile/test
 * @desc    Router profile test
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
