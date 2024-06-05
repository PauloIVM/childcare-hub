import { Router } from "express";
import { accessControlMiddleware, errorHandler } from "@/infra/middlewares";
import { babyRecordRouter } from "./baby-record";

const router = Router();

router.use(accessControlMiddleware);
router.use("/baby-record", babyRecordRouter);
router.use(errorHandler);

export { router };
