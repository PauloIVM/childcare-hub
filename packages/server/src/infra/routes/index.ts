import { Router } from "express";
import { accessControlMiddleware, errorHandler } from "@/infra/middlewares";
import { babyRecordRouter } from "./baby-record";
import { babyRouter } from "./baby";

const router = Router();

router.use(accessControlMiddleware);
router.use("/baby-record", babyRecordRouter);
router.use("/baby", babyRouter);
router.use(errorHandler);

export { router };
