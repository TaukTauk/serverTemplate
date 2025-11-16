import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";

import gateway from "./routes/gateway.js";
import apiKeyMiddleware from "./middlewares/apiMiddleware.js";
import dbConnection from "./middlewares/dbConnection.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = process.env.ALLOW_ORIGINS || "http://localhost:3000";
app.use(cors(
	{
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true
	}
));

// check db connection
app.use(dbConnection);

// api version
const apiversion = process.env.API_VERSION || "v1";

// api key middleware
app.use(apiKeyMiddleware);

// routes
app.use(`/api/${apiversion}`, gateway);

// error handler
app.use(errorHandler);

export default app;