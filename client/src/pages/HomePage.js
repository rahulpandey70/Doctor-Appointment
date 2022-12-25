import React, { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Layout from "../components/Layout";

const HomePage = () => {
	const getUserData = async () => {
		try {
			await axios.post(
				"/api/user/getUserData",
				{},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
		} catch (error) {
			message.error(`Something went wrong!`);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<Layout>
			<h1>HomePage</h1>
		</Layout>
	);
};

export default HomePage;
