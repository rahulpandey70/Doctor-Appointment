import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

const Profile = () => {
	const { user } = useSelector((state) => state.user);
	const [doctor, setDoctor] = useState(null);
	const params = useParams();

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

	return (
		<Layout>
			<h1>Profile</h1>
		</Layout>
	);
};

export default Profile;
