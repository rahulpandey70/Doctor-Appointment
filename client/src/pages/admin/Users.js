import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

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

	// Antd table columns
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Doctor",
			dataIndex: "isDoctor",
			render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: (text, record) => (
				<div className="d-flex">
					<button className="btn btn-danger">Delete</button>
				</div>
			),
		},
	];

	return (
		<Layout>
			<h1 className="text-center m-2">Users list</h1>
			<Table columns={columns} dataSource={users} />
		</Layout>
	);
};

export default Users;
