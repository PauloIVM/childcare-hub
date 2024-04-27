import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { UpdateBabyRecordUsecase } from "@/application/usecases/baby-record";
import { VerifyUsecase } from "@/application/usecases/auth";

export class UpdateBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Token de autenticação não fornecido." });
        }
        const token = req.headers.authorization.split(' ')[1];
        const verifyUsecase = new VerifyUsecase();
        if (!id || !fields) {
            return res.status(400).json({ message: "Missing essential fields." });
        }
        if (fields.actionName) {
            return res.status(400).json({ message: "Not allowed change action-name" });
        }
        try {
            const { userId } = verifyUsecase.exec(token);
            if (!userId) {
                return res.status(401).json({ message: "User authentication failed" });
            }
            const usecase = new UpdateBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId, fields);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
