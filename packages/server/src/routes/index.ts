import { Router } from "express";
import { accessControlMiddleware } from "../middlewares/access-control";
import { authRouter } from "./auth-router";

const router = Router();

router.use(accessControlMiddleware);
router.use("/auth", authRouter);

export { router };
