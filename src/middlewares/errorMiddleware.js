const errorHandler = (err, req, res, next) => {
	let error = {...err}
	error.message = err.message

	// Mongoose bad ObjectId
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		error.message = 'Resource not found'
		res.status(404)
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		error.message = 'Duplicate field value entered'
		res.status(400)
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		error.message = Object.values(err.errors).map(val => val.message)
		res.status(400)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		devMessage: error.message,
		message: error.message,
		result: {},
	});
}

export default errorHandler