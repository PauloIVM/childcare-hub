import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { GetBabyRecordsUsecase } from "@/application/usecases";

export class GetBabyRecordsController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { s = "0", l = "20", bid } = req.query || {};
        const skip = Number(s);
        const limit = Number(l);
        const babyId = bid as string;
        const token = req.headers.authorization?.split(' ')?.[1];
        const usecase = new GetBabyRecordsUsecase(
            BabyRecordRepository.getInstance(),
            new UsersGateway()
        );
        const { records, count, validActions } = await usecase.exec(babyId, token, skip, limit);
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
    }
}
