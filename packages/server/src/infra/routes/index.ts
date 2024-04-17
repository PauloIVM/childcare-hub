import { Router } from "express";
import { accessControlMiddleware } from "../middlewares/access-control";
import { authRouter } from "./auth-router";
import { babyRecordRouter } from "./baby-record";

const router = Router();

router.use(accessControlMiddleware);
router.use("/auth", authRouter);
router.use("/baby-record", babyRecordRouter);

export { router };
