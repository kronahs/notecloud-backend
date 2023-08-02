const express = require('express');
const Note = require('../models/noteModel');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Note
router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Note
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id);
    if (!note) {
      res.status(404).json({ mesage: `Cannot find note with ID ${id}` });
    }
    const updatedNote = await Note.findById(id);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Note
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: `Cannot find note with ID:${id}` });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
