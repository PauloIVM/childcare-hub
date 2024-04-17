import { Request, Response } from "express";
import { LogDiaryRepository } from "../../../infra/repositories/log-diary-repository";
import { DeleteLogUsecase } from "../../../usecases/log-diary/delete";

export class DeleteLogDiaryController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const id = req.body?.id;
        const userId = req.session?.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User authentication failed" });
        }
        if (!id) {
            return res.status(400).json({ message: "Nothing to delete" });
        }
        try {
            const usecase = new DeleteLogUsecase(new LogDiaryRepository());
            await usecase.exec(id, userId);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
