import { Request, Response } from "express";
import { LogDiaryRepository } from "../../../infra/repositories/log-diary-repository";
import { UpdateLogUsecase } from "../../../usecases/log-diary/update";

export class UpdateLogDiaryController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        const usecase = new UpdateLogUsecase(new LogDiaryRepository());
        const result = await usecase.exec(id, fields);
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json(result.res);
    }
}
