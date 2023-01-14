const express = require("express");
const {
	getDoctorInfoController,
	updateProfileController,
	getSingleDocInfoController,
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//POST SINGLE DOCTOR
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE DOCTOR PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//GET SINGLE DOCTOR INFO
router.post("/getSingleDocInfo", authMiddleware, getSingleDocInfoController);

module.exports = router;
