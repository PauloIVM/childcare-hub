import { Request, Response } from "express";
import { LogDiaryRepository } from "../../../infra/repositories/log-diary-repository";
import { DeleteLogUsecase } from "../../../usecases/log-diary/delete";

export class DeleteLogDiaryController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const id = req.body?.id;
        const usecase = new DeleteLogUsecase(new LogDiaryRepository());
        const result = await usecase.exec(id);
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json(result.res);
    }
}
