import { Router } from "express";
import * as authController from "@/infra/controllers/auth";

const authRouter = Router();

authRouter.post("/login", new authController.LoginController().exec);
authRouter.post("/sign-up", new authController.SignUpController().exec);
authRouter.post("/request-recover", new authController.RequestRecoverController().exec);
authRouter.post("/recover", new authController.RecoverController().exec);

export { authRouter };
