import { Router } from "express";
import * as userController from "@/infra/controllers/user";

const userRouter = Router();

userRouter.get("/me", new userController.GetUserController().exec);

export { userRouter };
