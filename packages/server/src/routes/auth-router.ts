import { Router } from "express";
import * as authController from "../controllers/auth";
import sessionMiddleware from "../middlewares/auth-session";

const router = Router();
router.use(sessionMiddleware);
router.get("/me", authController.meControllerFactory.create().exec);
router.post("/login", authController.loginControllerFactory.create().exec);
router.get("/logout", authController.logoutControllerFactory.create().exec);
router.post(
    "/register",
    authController.registerControllerFactory.create().exec,
);
router.post(
    "/password-retrieve",
    authController.passwordRecoverControllerFactory.create().exec,
);

export default router;
