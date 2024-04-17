import { Router } from "express";
import { accessControlMiddleware } from "../middlewares/access-control";
import { authRouter } from "./auth-router";
import { logDiaryRouter } from "./baby-record";

const router = Router();

router.use(accessControlMiddleware);
router.use("/auth", authRouter);
router.use("/baby-record", logDiaryRouter);

export { router };
