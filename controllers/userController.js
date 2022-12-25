const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

const registerController = async (req, res) => {
	try {
		const existingUser = await userModel.findOne({ email: req.body.email });
		if (existingUser)
			return res.status(200).send({
				message: "User already exits",
				success: false,
			});

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.password = hashedPassword;

		const newUser = new userModel(req.body);
		await newUser.save();
		res.status(201).send({
			message: "User has been successfully registred.",
			success: true,
		});
	} catch (error) {
		res.status(500).send({ message: `${error.message}`, success: false });
	}
};
const loginController = async (req, res) => {
	try {
		const user = await userModel.findOne({ email: req.body.email });
		if (!user) {
			return res
				.status(200)
				.send({ message: `User Not Found`, success: false });
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res
				.status(200)
				.send({ message: `Invaild Email or Password`, success: false });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).send({ message: "Login Success", success: true, token });
	} catch (error) {
		res.status(500).send({ message: `${error.message}`, success: false });
	}
};

const authController = async (req, res) => {
	try {
		const user = await userModel.findById({ _id: req.body.userId });
		user.password = undefined;
		if (!user) {
			return res
				.status(200)
				.send({ message: "User Not Found", success: false });
		} else {
			res.status(200).send({ success: true, data: user });
		}
	} catch (error) {
		res.status(500).send({ message: "Auth Error", success: false, error });
	}
};

const applyDoctorController = async (req, res) => {
	try {
		const newDoctor = await doctorModel({ ...req.body, status: "pending" });
		await newDoctor.save();
		const adminUser = await userModel.findOne({ isAdmin: true });
		const notification = adminUser.notification;
		notification.push({
			type: "Apply for doctor request",
			message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor`,
			data: {
				doctorId: newDoctor._id,
				name: newDoctor.firstName + " " + newDoctor.lastName,
				onClickPath: "/admin/doctors",
			},
		});
		await userModel.findByIdAndUpdate(adminUser._id, { notification });
		res.status(201).send({
			success: true,
			message: "Doctor account applied successfully",
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Error while applying doctor",
		});
	}
};

const getAllNotificationController = async (req, res) => {
	try {
		const user = await userModel.findOne({ _id: req.body.userId });
		const seenNotification = user.seenNotification;
		const notification = user.notification;
		seenNotification.push(...notification);
		user.notification = [];
		user.seenNotification = notification;
		const updatedUser = await user.save();
		res.status(200).send({
			message: "All notification marked as read",
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).send({
			message: "Error in Notification",
			success: false,
		});
	}
};

const deleteAllNotificationController = async (req, res) => {
	try {
		const user = await userModel.findOne({ _id: req.body.userId });
		user.notification = [];
		user.seenNotification = [];
		const updatedUser = await user.save();
		updatedUser.password = undefined;
		res.status(200).send({
			success: true,
			message: "Notification Deleted Successfully",
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).send({
			message: "Unable to delete all notification",
			success: false,
		});
	}
};

module.exports = {
	loginController,
	registerController,
	authController,
	applyDoctorController,
	getAllNotificationController,
	deleteAllNotificationController,
};
