const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({ userId: req.body.userId });
		res.status(200).send({
			success: true,
			message: "Doctor fetched successfully",
			data: doctor,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching doctor",
			error,
		});
	}
};

const updateProfileController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOneAndUpdate(
			{ userId: req.body.userId },
			req.body
		);
		res.status(201).send({
			success: true,
			message: "Doctor profile updated",
			data: doctor,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while updating doctor profile",
			error,
		});
	}
};

module.exports = { getDoctorInfoController, updateProfileController };
