import { Request, Response } from "express";
import { BabiesRepository } from "@/infra/repositories";
import { UsersGateway } from "@/infra/gateways";
import { GetBabiesUsecase } from "@/application/usecases";

export class GetBabiesController {
    constructor() {}

    async exec(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')?.[1];
        const usecase = new GetBabiesUsecase(
            new UsersGateway(),
            BabiesRepository.getInstance()
        );
        const result = await usecase.exec(token);
        res.json({ babies: result.map((r) => ({
            id: r.id,
            name: r.name,
            gender: r.gender,
            birthday: r.birthday
        }))});
    }
}
