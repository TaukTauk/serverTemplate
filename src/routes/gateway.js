import express from "express";
const router = express.Router();

import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;