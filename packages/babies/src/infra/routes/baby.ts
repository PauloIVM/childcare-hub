import { Router } from "express";
import * as babyController from "@/infra/controllers";

const babyRouter = Router();

babyRouter.post("/", new babyController.InsertBabyController().exec);
babyRouter.get("/", new babyController.GetBabiesController().exec);

export { babyRouter };
