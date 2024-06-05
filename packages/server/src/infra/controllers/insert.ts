import { Request, Response } from "express";
import { BabyRecordRepository, BabiesRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { InsertBabyRecordUsecase } from "@/application/usecases";

export class InsertBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const {
            babyId,
            actionName,
            observations,
            init,
            end
        } = req.body as Record<string, string> || {};
        const token = req.headers.authorization?.split(' ')?.[1];
        const usecase = new InsertBabyRecordUsecase(
            new UsersGateway(),
            BabiesRepository.getInstance(),
            BabyRecordRepository.getInstance(),
        );
        await usecase.exec(token, {
            babyId,
            actionName,
            observations,
            init: new Date(init),
            end: new Date(end)
        });
        res.json({ message: "ok" });
    }
}
