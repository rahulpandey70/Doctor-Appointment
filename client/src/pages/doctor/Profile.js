import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../../components/Layout";

const Profile = () => {
	const { user } = useSelector((state) => state.user);
	const [doctor, setDoctor] = useState(null);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Get doctor details
	const getDoctor = async () => {
		try {
			const res = await axios.post(
				"/api/doctor/getDoctorInfo",
				{ userId: params.id },
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			if (res.data.success) {
				setDoctor(res.data.data);
			}
		} catch (error) {
			message.error(`Something went wrong!`);
		}
	};

	useEffect(() => {
		getDoctor();
	}, []);

	//handle finish
	const handleFinish = async (values) => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"/api/doctor/updateProfile",
				{
					...values,
					userId: user._id,
					timings: [
						moment(values.timings[0]).format("HH:mm"),
						moment(values.timings[1]).format("HH:mm"),
					],
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success(res.data.message);
				navigate("/");
			} else {
				message.error(res.data.success);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error("Something Went Wrong ");
		}
	};

	return (
		<Layout>
			<h1 className="text-center">Manage Profile</h1>
			{doctor && (
				<Form
					layout="vertical"
					className="m-3"
					onFinish={handleFinish}
					initialValues={{
						...doctor,
						timings: [
							moment(doctor.timings[0], "HH:mm"),
							moment(doctor.timings[1], "HH:mm"),
						],
					}}
				>
					<h4>Personal Details :</h4>
					<Row gutter={20}>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Fist Name" name="firstName" required>
								<Input type="text" placeholder="Your first Name" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Last Name" name="lastName" required>
								<Input type="text" placeholder="Your last name" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Phone No" name="phone" required>
								<Input type="text" placeholder="Your contact no" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Email" name="email" required>
								<Input type="email" placeholder="Your email address" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Website" name="website">
								<Input type="text" placeholder="Your website" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Address" name="address" required>
								<Input type="text" placeholder="Your clinic address" />
							</Form.Item>
						</Col>
					</Row>
					<h4>Professional Details :</h4>
					<Row gutter={20}>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Specialization" name="specialization" required>
								<Input type="text" placeholder="Your specialization" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Experience" name="experience" required>
								<Input type="text" placeholder="Your experience" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item
								label="Fees Per Cunsaltation"
								name="feePerCunsaltation"
								required
							>
								<Input type="text" placeholder="Cunsaltation fee" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}>
							<Form.Item label="Timings" name="timings" required>
								<TimePicker.RangePicker format="HH:mm" />
							</Form.Item>
						</Col>
						<Col xs={24} md={24} lg={8}></Col>
						<Col xs={24} md={24} lg={8}>
							<button className="btn btn-primary form-btn" type="submit">
								Update
							</button>
						</Col>
					</Row>
				</Form>
			)}
		</Layout>
	);
};

export default Profile;
