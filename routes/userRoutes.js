const express = require("express");
const {
	loginController,
	registerController,
	authController,
	applyDoctorController,
	getAllNotificationController,
	deleteAllNotificationController,
	getAllDoctorsController,
	bookAppointmentController,
	checkAvailbilityController,
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

// get all doctor
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// Book appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// Checking availbility
router.post("/check-availbility", authMiddleware, checkAvailbilityController);

module.exports = router;
