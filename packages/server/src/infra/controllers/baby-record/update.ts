import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { UpdateLogUsecase } from "../../../usecases/baby-record/update";

export class UpdateBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        const userId = req.session?.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "User authentication failed" });
        }
        if (!id || !fields) {
            return res.status(400).json({ message: "Nothing to change" });
        }
        try {
            const usecase = new UpdateLogUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId, fields);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}