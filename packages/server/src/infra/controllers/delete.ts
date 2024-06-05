import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { DeleteBabyRecordUsecase } from "@/application/usecases";

export class DeleteBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const id = req.query?.id as string;
        const token = req.headers.authorization?.split(' ')?.[1];    
        const usecase = new DeleteBabyRecordUsecase(
            BabyRecordRepository.getInstance(),
            new UsersGateway()
        );
        await usecase.exec(id, token);
        res.json({ message: "ok" });
    }
}
