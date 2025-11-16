import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				devMessage: "User not found",
				message: "User not found",
				result: {},
			});
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				devMessage: "Invalid credentials",
				message: "Invalid credentials",
				result: {},
			});
		}

		const token = generateToken(user._id);
		return res.status(200).json({
			success: true,
			devMessage: "Login successful",
			message: "Login successful",
			result: { 
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
					profile_url: user.profile_url
				},
				token
			 },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			devMessage: "Server error",
			message: "Server error",
			result: {},
		});
	}
}

export { loginUser };