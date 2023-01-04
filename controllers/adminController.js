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

module.exports = { getAllUsersController, getAllDoctorsController };
