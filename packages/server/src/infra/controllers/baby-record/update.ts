import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { UpdateBabyRecordUsecase } from "../../../usecases/baby-record/update";

export class UpdateBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        const userId = req.session?.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User authentication failed" });
        }
        if (!id || !fields) {
            return res.status(400).json({ message: "Missing essential fields." });
        }
        if (fields.actionName) {
            return res.status(400).json({ message: "Not allowed change action-name" });
        }
        try {
            const usecase = new UpdateBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId, fields);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
