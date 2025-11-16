import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/userController.js";
import authen from "../middlewares/authenticateMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";
import { singleFile } from "../middlewares/fileParserMiddleware.js";

// Use authMiddleware if only admins can register new users
router.post("/register", singleFile("profile"), registerUser);

export default router;