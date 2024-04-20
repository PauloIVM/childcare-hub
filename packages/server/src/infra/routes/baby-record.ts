import * as babyRecordController from "../controllers/baby-record";
import { Router } from "express";
import { sessionMiddleware } from "../middlewares/auth-session";

const babyRecordRouter = Router();
babyRecordRouter.use(sessionMiddleware);
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
