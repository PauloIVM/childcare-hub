import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { InsertBabyRecordUsecase } from "@/application/usecases/baby-record";
import { IBabyRecordDTO } from "@/application/dtos";
import { VerifyUsecase } from "@/application/usecases/auth";

export class InsertBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        // INFO: Interface-adapter - Como isolar isso melhor??
        let record: IBabyRecordDTO;
        try {
            record = this.parseReqBody(req);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
        // INFO: Fim do interface-adapter
        try {
            const usecase = new InsertBabyRecordUsecase(new BabyRecordRepository());
            await usecase.exec(record);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    // TODO: Esse método não está mais legal... mover a lógica de volta pra cima e pensar
    //       em outra maneira de fazer esse parse.
    private parseReqBody(req: Request): IBabyRecordDTO {
        const {
            actionName,
            observations,
            init,
            end
        } = req.body as Record<string, string> || {};
        const isAllStringFields = [actionName, observations, init, end]
            .filter((e) => !!e)
            .every((e) => typeof e === "string");
        if (!req.headers.authorization) {
            throw new Error("Token de autenticação não fornecido.");
        }
        const token = req.headers.authorization.split(' ')[1];
        const verifyUsecase = new VerifyUsecase();
        const { userId } = verifyUsecase.exec(token);
        if (!userId) {
            throw new Error("User authentication failed");
        }
        if (!isAllStringFields) {
            throw new Error("Invalid some record field type");
        }
        const initAsDate = new Date(init);
        const endAsDate = new Date(end);
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(initAsDate) || (end && !isValidDate(endAsDate))) {
            throw new Error("Failed to build record init/end fields");
        }
        // TODO: Parsear novos campos... ainda não vou utilizar... mas já deixar no
        //       jeito
        return {
            userId,
            actionName,
            observations,
            init: initAsDate,
            end: endAsDate
        };
    }
}
