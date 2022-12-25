const mongoose = require("mongoose");

const connectDB = async () => {
	mongoose.set("strictQuery", true);
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log(`MongoDb connected successfully ${mongoose.connection.host}`);
	} catch (error) {
		console.log(`Mongodb server issue ${error}`);
	}
};

module.exports = connectDB;
