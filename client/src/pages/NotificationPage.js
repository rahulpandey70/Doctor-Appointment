import { message, Tabs } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// handle read notification
	const handleMarkAllRead = async () => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"/api/user/get-all-notification",
				{
					userId: user._id,
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
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error("Somthing went wrong!");
		}
	};

	// Handle delete notification
	const handleDeleteAllReadNotification = async () => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"/api/user/delete-all-notification",
				{
					userId: user._id,
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
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error("Somthing went wrong");
		}
	};
	return (
		<Layout>
			<h4 className="p-3 text-center text-uppercase">Notification Page</h4>
			<Tabs>
				<Tabs.TabPane tab="Unread" key={0}>
					<div className="d-flex justify-content-end">
						<h4
							className="p-2 text-primary"
							style={{ cursor: "pointer" }}
							onClick={handleMarkAllRead}
						>
							Mark All Read
						</h4>
					</div>
					{user?.notification.map((notificationMsg, index) => (
						<div
							className="card"
							onClick={() => navigate(notificationMsg.onClickPath)}
							style={{ cursor: "pointer" }}
							key={index}
						>
							<div className="card-text">{notificationMsg.message}</div>
						</div>
					))}
				</Tabs.TabPane>
				<Tabs.TabPane tab="Read" key={1}>
					<div className="d-flex justify-content-end">
						<h4
							className="p-2 text-danger"
							style={{ cursor: "pointer" }}
							onClick={handleDeleteAllReadNotification}
						>
							Delete All Read
						</h4>
					</div>
					{user?.seenNotification.map((notificationMsg, index) => (
						<div
							className="card"
							onClick={() => navigate(notificationMsg.onClickPath)}
							style={{ cursor: "pointer" }}
							key={index}
						>
							<div className="card-text">{notificationMsg.message}</div>
						</div>
					))}
				</Tabs.TabPane>
			</Tabs>
		</Layout>
	);
};

export default NotificationPage;
