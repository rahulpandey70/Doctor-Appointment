import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { DatePicker, message, TimePicker } from "antd";
import { moment } from "moment";

const BookingPage = () => {
	const params = useParams();
	const [doctors, setDoctors] = useState([]);
	const [data, setDate] = useState();
	const [timings, setTimings] = useState();
	const [isAvailable, setIsAvailable] = useState();

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
							Timings: {doctors.timings[0]} {doctors.timings[1]}{" "}
						</h4>
						<div className="d-flex flex-column w-50">
							<DatePicker
								className="m-2"
								format="DD-MM-YYYY"
								onChange={(v) => setDate(moment(v).format("DD-MM-YYYY"))}
							/>
							<TimePicker.RangePicker
								format="HH:mm"
								className="m-2"
								onChange={(values) =>
									setTimings(
										moment(values[0]).format("HH:mm"),
										moment(values[1]).format("HH:mm")
									)
								}
							/>
							<button className="btn btn-primary mt-2">
								Check Availability
							</button>
							<button className="btn btn-dark mt-2">Book Now</button>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default BookingPage;
