import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { DeleteBabyRecordUsecase } from "../../../usecases/baby-record/delete";

export class DeleteBabyRecordController {
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
            const usecase = new DeleteBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
