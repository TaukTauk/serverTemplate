import connectDB from "../config/db.js";

const dbConnection = async (req, res, next) => {
	try {
		await connectDB();
		next();
	} catch (error) {
		res.status(500).json({ 
			success: false,
			devMessage: "Database connection error",
			message: "Database connection error",
			result: {}
		});
	}
};

export default dbConnection;