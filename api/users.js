const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../models/User");

/**
 * @router  /api/users/test
 * @desc    Router users test
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/**
 * @router  /api/users/register
 * @desc    User Registration
 * @access  Public
 */
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @router  /api/users/login
 * @desc    User login
 * @access  Public
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ msg: "Email and password are both required!" });
  }
  User.findOne({ email }).then(user => {
    if (!user) res.status(404).json({ email: "User not found!" });
    bcrypt.compare(password, user.password).then(isMatched => {
      if (!isMatched) res.status(400).json({ password: "Password wrong!" });
      res.json({ msg: "Success" });
    });
  });
});

module.exports = router;
