const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Load valiadtion rule
const validateProfileInput = require("../../validation/profile");

/**
 * @router  /api/profile/test
 * @desc    Router profile test
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

/**
 * @router  GET /api/profile
 * @desc    Get profile of the current user
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for the current user.";
        return res.status(404).json(errors);
      }
      res.json(profile);
    });
  }
);

/**
 * @router  POST /api/profile
 * @desc    Create OR update profile of the current user
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills
    if (typeof req.body.skills)
      profileFields.skills = req.body.skills.split(",");

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        // Create
        // Handle check
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists.";
            return res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        });
      }
    });
  }
);

module.exports = router;
