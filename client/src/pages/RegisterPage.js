import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/Register.css";

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//form handler
	const onfinishHandler = async (values) => {
		try {
			dispatch(showLoading());
			const res = await axios.post("/api/user/register", values);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success(res.data.message);
				navigate("/login");
			} else {
				dispatch(hideLoading());
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error("Something went wrong!");
		}
	};
	return (
		<>
			<div className="form-container">
				<Form
					layout="vertical"
					onFinish={onfinishHandler}
					className="register-form"
				>
					<h3 className="text-center">Register Form</h3>
					<Form.Item label="Name" name="name">
						<Input type="text" required />
					</Form.Item>
					<Form.Item label="Email" name="email">
						<Input type="email" required />
					</Form.Item>
					<Form.Item label="Password" name="password">
						<Input type="password" required />
					</Form.Item>
					<Link to="/login" className="m-2">
						Already An Account? Login Here.
					</Link>
					<button className="btn btn-primary" type="submit">
						Register
					</button>
				</Form>
			</div>
		</>
	);
};

export default RegisterPage;
