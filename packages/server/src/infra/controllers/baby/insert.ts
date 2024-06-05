import { Request, Response } from "express";
import { BabiesRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { InsertBabyUsecase } from "@/application/usecases";

export class InsertBabyController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const {
            name,
            gender,
            birthday,
        } = req.body as Record<string, string> || {};
        const token = req.headers.authorization?.split(' ')?.[1];
        const usecase = new InsertBabyUsecase(
            new UsersGateway(),
            BabiesRepository.getInstance()
        );
        await usecase.exec(token, {
            name,
            gender,
            birthday: new Date(birthday),
            parentIds: []
        });
        res.json({ message: "ok" });
    }
}
