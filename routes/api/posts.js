const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// Load validation rules
const validatePostInput = require("../../validation/post");

/**
 * @router  /api/posts/test
 * @desc    Router posts test
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

/**
 * @router  POST /api/posts/
 * @desc    Create post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      text: req.body.text
    });

    newPost.save().then(post => res.json(post));
  }
);

/**
 * @router  GET /api/posts/
 * @desc    Get posts
 * @access  Public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
});

/**
 * @router  GET /api/posts/:id
 * @desc    Get single post
 * @access  Public
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

/**
 * @router  DELETE /api/posts/:post_id
 * @desc    Delete post
 * @access  Private
 */
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id).then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized." });
          }

          // Deletion
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err => res.json(err));
        });
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
