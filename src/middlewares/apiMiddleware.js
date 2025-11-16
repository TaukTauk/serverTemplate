
const apiKeyMiddleware = (req, res, next) => {
	const expectedApiKey = process.env.API_KEY;
	const apiKey = req.headers["x-api-key"];
	
	if (!apiKey) {
		return res.status(401).json({
			success: false,
			devMessage: "API key not provided",
			message: "Server is not available!",
			result: {},
		});
	}

	if (apiKey !== expectedApiKey) {
		return res.status(401).json({
			success: false,
			devMessage: "Invalid API key",
			message: "Server is not available!",
			result: {},
		});
	}

	next();
};

export default apiKeyMiddleware;