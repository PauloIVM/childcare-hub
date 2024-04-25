import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories/baby-record-repository";
import { DeleteBabyRecordUsecase } from "@/application/usecases/baby-record/delete";

export class DeleteBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const id = req.query?.id as string;
        const userId = req.session?.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User authentication failed" });
        }
        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Pass a valid 'id'" });
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
