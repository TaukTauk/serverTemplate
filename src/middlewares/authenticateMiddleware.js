import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateMiddleware = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const userId = req.headers("userId");
			if (!userId) {
				return res.status(401).json({
					success: false,
					devMessage: "Not authorized, no user id",
					message: "Not authorized",
					result: {},
				});
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			if (decoded.user.id !== userId) {
				return res.status(401).json({
					success: false,
					devMessage: "Not authorized, token failed",
					message: "Not authorized",
					result: {},
				});
			}
			req.user = await User.findById(decoded.user.id).select("-password");
			next();
		} catch (error) {
			res.status(500).json({
				success: false,
				devMessage: "Internal server error",
				message: "Please login again",
				result: {},
			})
		}
	}
	if (!token) {
		res.status(401).json({
			success: false,
			devMessage: "Not authorized, no token",
			message: "Not authorized, no token",
			result: {},
		});
	}
};

export default authenticateMiddleware;