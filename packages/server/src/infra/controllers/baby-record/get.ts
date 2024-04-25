import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories/baby-record-repository";
import { GetBabyRecordsUsecase } from "@/application/usecases/baby-record";
import { VerifyUsecase } from "@/application/usecases/auth";

export class GetBabyRecordsController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { s = "0", l = "20" } = req.query || {};
        const skip = Number(s);
        const limit = Number(l);
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Token de autenticação não fornecido." });
        }
        const token = req.headers.authorization.split(' ')[1];
        const verifyUsecase = new VerifyUsecase();
        if (isNaN(skip) || isNaN(limit)) {
            return res.status(400).json({ message: "Bad skip/limit param" });
        }
        if (limit > 100) {
            return res.status(400).json({ message: "Records are limited by 100 elements per request" });
        }
        try {
            const { userId } = verifyUsecase.exec(token);
            if (!userId) {
                return res.status(401).json({ message: "User authentication failed" });
            }
            const usecase = new GetBabyRecordsUsecase(new BabyRecordRepository());
            const { records, count, validActions } = await usecase.exec(userId, skip, limit);
            res.json({
                message: "ok",
                validActions: validActions.map(({ name, label }) => ({ name, label })),
                count,
                records: records.map((r) => ({
                    id: r.id,
                    observations: r.observations,
                    init: r.init,
                    end: r.end,
                    actionName: r.action.name,
                    actionLabel: r.action.label,
                    height: r.height,
                    weight: r.weight,
                    temperature: r.temperature,
                    sleepQuality: r.sleepQuality,
                    breastfeedingAmount: r.breastfeedingAmount,
                    breastfeedingType: r.breastfeedingType,
                }))
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
