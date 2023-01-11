import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminMenu, UserMenu } from "../Data/Data";
import "../styles/Layout.css";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
	const { user } = useSelector((state) => state.user);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		message.success("Logout successfully");
		navigate("/login");
	};

	// doctor-menu
	const DoctorMenu = [
		{
			name: "Home",
			path: "/",
			icon: "fa-solid fa-house",
		},
		{
			name: "Appointments",
			path: "/appointments",
			icon: "fa-solid fa-list",
		},
		{
			name: "Profile",
			path: `/doctor/profile/${user?._id}`,
			icon: "fa-solid fa-user",
		},
	];

	// rendering menu
	const SidebarMenu = user?.isAdmin
		? AdminMenu
		: user?.isDoctor
		? DoctorMenu
		: UserMenu;
	return (
		<>
			<div className="main">
				<div className="layout">
					<div className="sidebar">
						<div className="logo">
							<h6>DOCTOR APP</h6>
							<hr />
						</div>
						<div className="menu">
							{SidebarMenu.map((menu, index) => {
								const isActive = location.pathname === menu.path;
								return (
									<div
										className={`menu-item ${isActive && "active"}`}
										key={index}
									>
										<i className={menu.icon}></i>
										<Link to={menu.path}>{menu.name}</Link>
									</div>
								);
							})}
							<div className={"menu-item"} onClick={handleLogout}>
								<i className="fa-solid fa-right-from-bracket"></i>
								<Link to="/login">Logout</Link>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="header">
							<div className="header-content">
								<Badge
									count={user?.notification.length}
									onClick={() => {
										navigate("/notification");
									}}
								>
									<i
										className="fa-solid fa-bell"
										style={{ cursor: "pointer" }}
									></i>
								</Badge>
								<Link to="/profile">{user?.name}</Link>
							</div>
						</div>
						<div className="body">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
