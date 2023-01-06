const express = require("express");
const {
	getAllUsersController,
	getAllDoctorsController,
	changeAccountStatusController,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST METHOD || ACCOUNT STATUS
router.post(
	"/changedAccountStatus",
	authMiddleware,
	changeAccountStatusController
);

module.exports = router;
