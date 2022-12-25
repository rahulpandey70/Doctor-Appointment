const express = require("express");
const {
	loginController,
	registerController,
	authController,
	applyDoctorController,
	getAllNotificationController,
	deleteAllNotificationController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// router object
const router = express.Router();

// routes
// Login || Post
router.post("/login", loginController);

// Register || Post
router.post("/register", registerController);

// Auth || Post
router.post("/getUserData", authMiddleware, authController);

// Apply doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// get all notification
router.post(
	"/get-all-notification",
	authMiddleware,
	getAllNotificationController
);

// delete all notification
router.post(
	"/delete-all-notification",
	authMiddleware,
	deleteAllNotificationController
);

module.exports = router;
