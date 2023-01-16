import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
	const params = useParams();
	const [doctors, setDoctors] = useState([]);
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const [isAvailable, setIsAvailable] = useState();

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const getUserData = async () => {
		try {
			const res = await axios.post(
				"/api/doctor/getSingleDocInfo",
				{ doctorId: params.doctorId },
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
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

	const handleBooking = async () => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"/api/user/book-appointment",
				{
					doctorId: params.doctorId,
					userId: user._id,
					doctorInfo: doctors,
					userInfo: user,
					date: date,
					time: time,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error(`Something went wrong`);
		}
	};

	const handleAvailability = async () => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"/api/user/check-availbility",
				{ doctorId: params.doctorId, date, time },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (res.data.success) {
				setIsAvailable(true);
				message.success(res.data.message);
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
		}
	};

	return (
		<Layout>
			<h3 className="text-center">BookingPage</h3>
			<div className="container m-2">
				{doctors && (
					<div>
						<h4>
							Dr.{doctors.firstName} {doctors.lastName}
						</h4>
						<h4>Fees: {doctors.feePerCunsaltation}</h4>
						<h4>
							Timings: {doctors.timings && doctors.timings[0]} To{" "}
							{doctors.timings && doctors.timings[1]}
						</h4>
						<div className="d-flex flex-column w-50">
							<DatePicker
								className="m-2"
								format="DD-MM-YYYY"
								onChange={(v) => setDate(moment(v).format("DD-MM-YYYY"))}
							/>
							<TimePicker
								format="HH:mm"
								className="m-2"
								onChange={(value) => setTime(moment(value).format("HH:mm"))}
							/>
							<button
								className="btn btn-primary mt-2"
								onClick={handleAvailability}
							>
								Check Availability
							</button>
							<button className="btn btn-dark mt-2" onClick={handleBooking}>
								Book Now
							</button>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default BookingPage;
