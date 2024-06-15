import { Router } from "express";
import * as babyRecordController from "@/infra/controllers";

const babyRecordRouter = Router();

// TODO: O correto do GET seria /baby-records e não /baby-record
babyRecordRouter.get("/", new babyRecordController.GetBabyRecordsController().exec);
babyRecordRouter.post("/", new babyRecordController.InsertBabyRecordController().exec);
babyRecordRouter.patch("/", new babyRecordController.UpdateBabyRecordController().exec);
babyRecordRouter.delete("/", new babyRecordController.DeleteBabyRecordController().exec);

export { babyRecordRouter };
