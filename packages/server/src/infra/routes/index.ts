import { Router } from "express";
import { accessControlMiddleware } from "../middlewares/access-control";
import { authRouter } from "./auth-router";
import { logDiaryRouter } from "./log-diary";

const router = Router();

router.use(accessControlMiddleware);
router.use("/auth", authRouter);
router.use("/log-diary", logDiaryRouter);

export { router };
