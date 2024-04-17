import * as logDiaryController from "../controllers/log-diary";
import { Router } from "express";
import { sessionMiddleware } from "../middlewares/auth-session";

const logDiaryRouter = Router();
logDiaryRouter.use(sessionMiddleware);
// INFO: Mover a injeção do repository para o router faz sentido??
logDiaryRouter.delete("/",
    new logDiaryController.DeleteLogDiaryController().exec.bind(this)
);
logDiaryRouter.put("/", (req, res) => {
    const controller = new logDiaryController.InsertLogDiaryController();
    return controller.exec(req, res);
});
logDiaryRouter.patch("/", new logDiaryController.UpdateLogDiaryController().exec.bind(this));

export { logDiaryRouter };
