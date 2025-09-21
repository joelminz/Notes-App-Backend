// Importing Models
const Note = require("../models/note");

// Controllers

// To retrieve all notes from the database for the authenticated user
const get_all_notes = (req, res) => {
  const userId = req.user._id;
  
  Note.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('user', 'username email')
    .then((result) => {
      if (result.length > 0) {
        res.json({
          success: true,
          msg: "All notes have been fetched successfully!",
          content: result,
        });
      } else {
        res.json({ 
          success: true,
          msg: "No notes to show!" 
        });
      }
    })
    .catch((error) => res.status(500).json({ 
      success: false,
      msg: error.message 
    }));
};

// To add a new note to the database for the authenticated user
const add_note = (req, res) => {
  const userId = req.user._id;
  
  let note = new Note({
    ...req.body,
    user: userId
  });
  
  note
    .save()
    .then((result) => {
      return Note.findById(result._id).populate('user', 'username email');
    })
    .then((populatedNote) => {
      res.status(201).json({
        success: true,
        msg: "Your note was saved successfully!",
        content: populatedNote,
      });
    })
    .catch((error) => res.status(400).json({ 
      success: false,
      msg: error.message 
    }));
};

// To retrieve a single note by its ID for the authenticated user
const get_one_note = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  
  Note.findOne({ _id: id, user: userId })
    .populate('user', 'username email')
    .then((result) => {
      if (result != null) {
        res.json({
          success: true,
          msg: "The note was fetched successfully!",
          content: result,
        });
      } else {
        res.status(404).json({ 
          success: false,
          msg: "This note doesn't exist or you don't have permission to access it!" 
        });
      }
    })
    .catch((error) => res.status(500).json({ 
      success: false,
      msg: error.message 
    }));
};

// To edit an existing note for the authenticated user
const update_note = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  
  // Remove user field from update data to prevent user change
  const { user, ...updateData } = req.body;
  
  Note.findOneAndUpdate(
    { _id: id, user: userId }, 
    updateData, 
    { new: true }
  )
    .populate('user', 'username email')
    .then((result) => {
      if (result != null) {
        res.json({
          success: true,
          msg: "The note was updated successfully!",
          content: result,
        });
      } else {
        res.status(404).json({ 
          success: false,
          msg: "This note doesn't exist or you don't have permission to update it!" 
        });
      }
    })
    .catch((error) => res.status(500).json({ 
      success: false,
      msg: error.message 
    }));
};

// To delete a note from the database for the authenticated user
const delete_note = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  
  Note.findOneAndDelete({ _id: id, user: userId })
    .then((result) => {
      if (result != null) {
        res.json({ 
          success: true,
          msg: "The note was successfully deleted!" 
        });
      } else {
        res.status(404).json({ 
          success: false,
          msg: "This note doesn't exist or you don't have permission to delete it!" 
        });
      }
    })
    .catch((error) => res.status(500).json({ 
      success: false,
      msg: error.message 
    }));
};

// Exports
module.exports = {
  get_all_notes,
  add_note,
  get_one_note,
  update_note,
  delete_note,
};
