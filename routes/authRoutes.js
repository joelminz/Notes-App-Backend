const express = require("express");
const router = express.Router();

// Import Controllers
const authController = require("../controllers/authController");

// Import Middleware
const { authenticateToken } = require("../middleware/auth");
const { 
  validateRegister, 
  validateLogin, 
  validateProfileUpdate, 
  validatePasswordChange 
} = require("../middleware/validation");

// Public routes
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);

// Protected routes (require authentication)
router.get("/profile", authenticateToken, authController.getProfile);
router.put("/profile", authenticateToken, validateProfileUpdate, authController.updateProfile);
router.put("/change-password", authenticateToken, validatePasswordChange, authController.changePassword);

module.exports = router;