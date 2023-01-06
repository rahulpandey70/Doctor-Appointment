import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message } from "antd";

const Users = () => {
	const [users, setUsers] = useState([]);

	//Get all Users
	const getUsers = async () => {
		try {
			const res = await axios("/api/admin/getAllUsers", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			if (res.data.success) {
				setUsers(res.data.data);
			}
		} catch (error) {
			message.error("Somthing went worng");
		}
	};

	useEffect(() => {
		getUsers();
	}, []);
	return (
		<Layout>
			<h1>Users list</h1>
		</Layout>
	);
};

export default Users;
