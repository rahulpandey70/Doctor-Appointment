const express = require("express");
const {
	getDoctorInfoController,
	updateProfileController,
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//POST SINGLE DOCTOR
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE DOCTOR PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

module.exports = router;
