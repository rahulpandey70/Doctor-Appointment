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

module.exports = { getDoctorInfoController };
