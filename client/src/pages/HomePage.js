import React, { useEffect, useState } from "react";
import axios from "axios";
import { message, Row } from "antd";
import Layout from "../components/Layout";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
	const [doctors, setDoctors] = useState([]);

	const getUserData = async () => {
		try {
			const res = await axios.get("/api/user/getAllDoctors", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			if (res.data.success) {
				setDoctors(res.data.data);
			}
		} catch (error) {
			message.error(`Something went wrong!`);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<Layout>
			<h1 className="text-center">Home Page</h1>
			<Row>
				{doctors &&
					doctors.map((doctor, i) => <DoctorList doctor={doctor} key={i} />)}
			</Row>
		</Layout>
	);
};

export default HomePage;
