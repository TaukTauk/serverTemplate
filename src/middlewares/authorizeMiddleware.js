const roles = ["superadmin", "admin", "moderator", "user"];

const authorize = (role) => (req, res, next) => {
	if (!roles.includes(role)) {
		return res.status(400).json({
			success: false,
			devMessage: "Invalid role",
			message: "Invalid role",
			result: {}
		})
	}
	const userRole = req.user.role;
	const accessible = roles.indexOf(userRole) <= roles.indexOf(role);
	if (!accessible) {
		return res.status(401).json({
			success: false,
			devMessage: "Not authorized",
			message: "Not authorized",
			result: {}
		})
	}
	next()
};

export default authorize;