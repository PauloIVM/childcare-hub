import { Router } from "express";
import { accessControlMiddleware, errorHandler } from "@/infra/middlewares";
import { authRouter } from "./auth-router";
import { userRouter } from "./user-router";
import { babyRecordRouter } from "./baby-record";

const router = Router();

router.use(accessControlMiddleware);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/baby-record", babyRecordRouter);
router.use(errorHandler);

export { router };
