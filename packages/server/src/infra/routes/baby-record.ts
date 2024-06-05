import { Router } from "express";
import * as babyRecordController from "@/infra/controllers";

const babyRecordRouter = Router();

babyRecordRouter.delete("/",
    new babyRecordController.DeleteBabyRecordController().exec
);
babyRecordRouter.get("/",
    new babyRecordController.GetBabyRecordsController().exec
);
babyRecordRouter.put("/", (req, res) => {
    const controller = new babyRecordController.InsertBabyRecordController();
    return controller.exec(req, res);
});
babyRecordRouter.patch("/", new babyRecordController.UpdateBabyRecordController().exec);

export { babyRecordRouter };
