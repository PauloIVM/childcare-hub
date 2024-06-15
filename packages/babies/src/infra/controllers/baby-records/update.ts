import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { UpdateBabyRecordUsecase } from "@/application/usecases";

export class UpdateBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const { fields, id } = req.body || {};
        const token = req.headers.authorization?.split(' ')?.[1];
        const usecase = new UpdateBabyRecordUsecase(
            BabyRecordRepository.getInstance(),
            new UsersGateway()
        );
        await usecase.exec(token, { ...fields, recordId: id });
        res.json({ message: "ok" });
    }
}
