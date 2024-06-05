import { Router } from "express";
import * as babyRecordController from "@/infra/controllers";

const babyRouter = Router();

babyRouter.put("/", new babyRecordController.InsertBabyController().exec);

export { babyRouter };
