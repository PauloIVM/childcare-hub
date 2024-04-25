import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories/baby-record-repository";
import { DeleteBabyRecordUsecase } from "@/application/usecases/baby-record/delete";
import { VerifyUsecase } from "@/application/usecases/auth";

export class DeleteBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const id = req.query?.id as string;
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Token de autenticação não fornecido." });
        }
        const token = req.headers.authorization.split(' ')[1];
        const verifyUsecase = new VerifyUsecase();
        // TODO: Deixar todos esses try-catchs dos controllers em um error-handler middleware.
        try {
            const { userId } = verifyUsecase.exec(token);
            if (!userId) {
                return res.status(401).json({ message: "Falha na autenticação do usuário." });
            }
            if (!id || typeof id !== "string") {
                return res.status(400).json({ message: "Passe um 'id' válido." });
            }
            const usecase = new DeleteBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(id, userId);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
