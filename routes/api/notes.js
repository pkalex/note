const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Note model
const Note = require("../../models/Note");
// User model
const User = require("../../models/User");

// Validation
const validateNoteInput = require("../../validation/note");

// @route   GET api/notes/test
// @desc    Tests note route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Notes Works" }));

// @route   GET api/notes
// @desc    Get notes
// @access  Public
router.get("/", (req, res) => {
  Note.find()
    .sort({ date: -1 })
    .then(notes => res.json(notes))
    .catch(err => res.status(404).json({ nonotesfound: "No notes found" }));
});

// @route   GET api/notes/:id
// @desc    Get note by id
// @access  Public
router.get("/:id", (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err =>
      res.status(404).json({ nonotefound: "No note found with that ID" })
    );
});

// @route   POST api/notes
// @desc    Create note
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newNote = new Note({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newNote.save().then(note => res.json(note));
  }
);

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Note.findById(req.params.id)
        .then(note => {
          // Check for note owner
          if (note.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          note.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ notenotfound: "No note found" }));
    });
  }
);

// @route   POST api/notes/like/:id
// @desc    Like note
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Note.findById(req.params.id)
        .then(note => {
          if (
            note.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this note" });
          }

          // Add user id to likes array
          note.likes.unshift({ user: req.user.id });

          note.save().then(note => res.json(note));
        })
        .catch(err => res.status(404).json({ notenotfound: "No note found" }));
    });
  }
);

// @route   POST api/notes/unlike/:id
// @desc    Unlike note
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Note.findById(req.params.id)
        .then(note => {
          if (
            note.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this note" });
          }

          // Get remove index
          const removeIndex = note.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          note.likes.splice(removeIndex, 1);

          // Save
          note.save().then(note => res.json(note));
        })
        .catch(err => res.status(404).json({ notenotfound: "No note found" }));
    });
  }
);

// @route   POST api/notes/comment/:id
// @desc    Add comment to note
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Note.findById(req.params.id)
      .then(note => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        note.comments.unshift(newComment);

        // Save
        note.save().then(note => res.json(note));
      })
      .catch(err => res.status(404).json({ notenotfound: "No note found" }));
  }
);

// @route   DELETE api/notes/comment/:id/:comment_id
// @desc    Remove comment from note
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        // Check to see if comment exists
        if (
          note.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = note.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        note.comments.splice(removeIndex, 1);

        note.save().then(note => res.json(note));
      })
      .catch(err => res.status(404).json({ notenotfound: "No note found" }));
  }
);

module.exports = router;
