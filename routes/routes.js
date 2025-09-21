// Import Libraries
const express = require("express");
const router = express.Router();

// Import Controllers
const noteController = require("../controllers/noteController");
const messageController = require("../controllers/messageController");

// Import Auth Routes
const authRoutes = require("./authRoutes");

// Import Middleware
const { authenticateToken } = require("../middleware/auth");

// Authentication Routes
router.use("/auth", authRoutes);

// Feedback Route
router.post("/submitFeedback", messageController.submit_feedback);

// Protected Note Routes (require authentication)
router.get("/allNotes", authenticateToken, noteController.get_all_notes);
router.post("/addNote", authenticateToken, noteController.add_note);
router.get("/noteDetails/:id", authenticateToken, noteController.get_one_note);
router.patch("/updateNote/:id", authenticateToken, noteController.update_note);
router.delete("/deleteNote/:id", authenticateToken, noteController.delete_note);

// Exports
module.exports = router;
