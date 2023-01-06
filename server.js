const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// rest object
const app = express();

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// port
const Port = process.env.PORT || 8080;

// listening port
app.listen(Port, () => {
	console.log(
		`Server running on ${process.env.NODE_MODE} mode on port ${Port}`
	);
});
