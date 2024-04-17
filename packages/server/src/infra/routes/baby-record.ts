import * as logDiaryController from "../controllers/baby-record";
import { Router } from "express";
import { sessionMiddleware } from "../middlewares/auth-session";

const logDiaryRouter = Router();
logDiaryRouter.use(sessionMiddleware);
// INFO: Mover a injeção do repository para o router faz sentido??
logDiaryRouter.delete("/",
    new logDiaryController.DeleteBabyRecordController().exec.bind(this)
);
logDiaryRouter.put("/", (req, res) => {
    const controller = new logDiaryController.InsertBabyRecordController();
    return controller.exec(req, res);
});
logDiaryRouter.patch("/", new logDiaryController.UpdateBabyRecordController().exec.bind(this));

export { logDiaryRouter };
