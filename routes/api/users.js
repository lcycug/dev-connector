const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");

// Load User Model
const User = require("../../models/User");

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
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
  const validateLoginInput = require("../../validation/login");
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) res.status(404).json({ email: "User not found!" });
    bcrypt.compare(password, user.password).then(isMatched => {
      if (!isMatched) res.status(400).json({ password: "Password wrong!" });

      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    });
  });
});

/**
 * @router  /api/users/current
 * @desc    Return current user info
 * @access  Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Authenticated" });
  }
);

module.exports = router;
