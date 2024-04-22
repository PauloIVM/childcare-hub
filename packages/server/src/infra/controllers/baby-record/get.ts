import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { GetBabyRecordsUsecase } from "../../../usecases/baby-record/get";

export class GetBabyRecordsController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { s = "0", l = "20" } = req.query || {};
        const userId = req.session?.user?.id;
        const skip = Number(s);
        const limit = Number(l);
        if (isNaN(skip) || isNaN(limit)) {
            return res.status(400).json({ message: "Bad skip/limit param" });
        }
        if (!userId) {
            return res.status(401).json({ message: "User authentication failed" });
        }
        if (limit > 100) {
            return res.status(400).json({ message: "Records are limited by 100 elements per request" });
        }
        try {
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
                }))
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
