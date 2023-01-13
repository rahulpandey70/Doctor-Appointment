import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { message, Table } from "antd";

const Doctors = () => {
	const [doctors, setDoctors] = useState([]);

	//Get all Users
	const getDoctors = async () => {
		try {
			const res = await axios("/api/admin/getAllDoctors", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			if (res.data.success) {
				setDoctors(res.data.data);
			}
		} catch (error) {
			message.error("Somthing went worng");
		}
	};

	//Handle Approve button
	const handleAccountStaus = async (record, status) => {
		try {
			const res = await axios.post(
				"/api/admin/changedAccountStatus",
				{ doctorId: record._id, userId: record.userId, status },
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			if (res.data.success) {
				message.success(res.data.message);
				window.location.reload();
			}
		} catch (error) {
			message.error("Somthing went wrong");
		}
	};

	useEffect(() => {
		getDoctors();
	}, []);

	// Antd table columns
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text, record) => (
				<span>
					{record.firstName} {record.lastName}
				</span>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
		},
		{
			title: "Contact Number",
			dataIndex: "phone",
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: (text, record) => (
				<div className="d-flex">
					{record.status === "pending" ? (
						<button
							className="btn btn-success"
							onClick={() => handleAccountStaus(record, "approved")}
						>
							Approve
						</button>
					) : (
						<button className="btn btn-danger">Reject</button>
					)}
				</div>
			),
		},
	];

	return (
		<Layout>
			<h1 className="text-center m-2">All Doctors</h1>
			<Table columns={columns} dataSource={doctors} />
		</Layout>
	);
};

export default Doctors;
