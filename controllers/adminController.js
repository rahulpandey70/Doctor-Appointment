const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
	try {
		const users = await userModel.find({});
		res.status(200).send({
			success: true,
			message: "Users List Fetched successfully",
			data: users,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching users list",
			error,
		});
	}
};

const getAllDoctorsController = async (req, res) => {
	try {
		const doctors = await doctorModel.find({});
		res.status(200).send({
			success: true,
			message: "Doctors List Fetched successfully",
			data: doctors,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while fetching doctors list",
			error,
		});
	}
};

const changeAccountStatusController = async (req, res) => {
	try {
		const { doctorId, status } = req.body;
		const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
		const user = await userModel.findOne({ _id: doctor.userId });
		const notification = user.notification;
		notification.push({
			type: "Doctor account updated",
			message: `Your doctor account request has ${status} successfully`,
			onClickPath: "/notification",
		});
		user.isDoctor = status === "approved" ? true : false;
		await user.save();
		res.status(201).send({
			success: true,
			message: "Doctor account updated",
			data: doctor,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while changing doctors account status",
			error,
		});
	}
};

module.exports = {
	getAllUsersController,
	getAllDoctorsController,
	changeAccountStatusController,
};
