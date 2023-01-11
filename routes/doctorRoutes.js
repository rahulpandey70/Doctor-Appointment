const express = require("express");
const { getDoctorInfoController } = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//POST SINGLE DOCTOR
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

module.exports = router;
