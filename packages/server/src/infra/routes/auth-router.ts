import { Router } from "express";
import { sessionMiddleware } from "@/infra/middlewares/auth-session";
import * as authController from "@/infra/controllers/auth";

const authRouter = Router();
authRouter.use(sessionMiddleware);
authRouter.get("/me", (req, res) => {
    const me = authController.meControllerFactory.create();
    return me.exec(req, res);
});
authRouter.post("/login", (req, res) => {
    const login = authController.loginControllerFactory.create();
    return login.exec(req, res);
});
authRouter.get("/logout", (req, res) => {
    const logout = authController.logoutControllerFactory.create();
    return logout.exec(req, res);
});
authRouter.post("/register", (req, res) => {
    const register = authController.registerControllerFactory.create();
    return register.exec(req, res);
});
authRouter.post("/password-recover", (req, res) => {
    const passwordRecover =
        authController.passwordRecoverControllerFactory.create();
    return passwordRecover.exec(req, res);
});
// TODO: Password recover request...

export { authRouter };
