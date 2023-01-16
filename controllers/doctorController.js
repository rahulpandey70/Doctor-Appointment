const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

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

const getSingleDocInfoController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
		res.status(200).send({
			success: true,
			message: "Doctor profile fetched successfully",
			data: doctor,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching doctor profile",
			error,
		});
	}
};

const doctorAppointmentsController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({ userId: req.body.userId });
		const appointment = await appointmentModel.find({
			doctorId: doctor._id,
		});
		res.status(200).send({
			success: true,
			message: "Doctor appointments fetched successfully",
			data: appointment,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching doctor appointments",
			error,
		});
	}
};

const updateStatusController = async (req, res) => {
	try {
		const { appointmentsId, status } = req.body;
		const appointments = await appointmentModel.findByIdAndUpdate(
			appointmentsId,
			{ status }
		);
		const user = await userModel.findOne({ _id: appointments.userId });
		const notifcation = user.notifcation;
		notifcation.push({
			type: "status-updated",
			message: `your appointment has been updated ${status}`,
			onCLickPath: "/doctor-appointments",
		});
		await user.save();
		res.status(200).send({
			success: true,
			message: "Appointment Status Updated",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching doctor appointments",
			error,
		});
	}
};

module.exports = {
	getDoctorInfoController,
	updateProfileController,
	getSingleDocInfoController,
	doctorAppointmentsController,
	updateStatusController,
};
