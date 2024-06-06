import { Router } from "express";
import * as babyRecordController from "@/infra/controllers";

const babyRecordRouter = Router();

babyRecordRouter.get("/", new babyRecordController.GetBabyRecordsController().exec);
babyRecordRouter.post("/", new babyRecordController.InsertBabyRecordController().exec);
babyRecordRouter.patch("/", new babyRecordController.UpdateBabyRecordController().exec);
babyRecordRouter.delete("/", new babyRecordController.DeleteBabyRecordController().exec);

export { babyRecordRouter };
