import { Request, Response } from "express";
import { BabyRecordRepository } from "@/infra/repositories";
import { InsertBabyRecordUsecase } from "@/application/usecases/baby-record";
import { IBabyRecordDTO } from "@/application/dtos";
import { VerifyUsecase } from "@/application/usecases/auth";
import { ValidationError } from "@/domain";

export class InsertBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        // INFO: Interface-adapter - Como isolar isso melhor??
        const record: IBabyRecordDTO = this.parseReqBody(req);
        // INFO: Fim do interface-adapter
        const usecase = new InsertBabyRecordUsecase(BabyRecordRepository.getInstance());
        await usecase.exec(record);
        res.json({ message: "ok" });
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
            throw new ValidationError({
                message: "Missing auth token.",
                clientMessage: "Token de autenticação não fornecido.",
                status: 401
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        const verifyUsecase = new VerifyUsecase();
        const { userId } = verifyUsecase.exec(token);
        if (!userId) {
            throw new ValidationError({
                message: "Invalid auth token.",
                clientMessage: "Token de autenticação inválido ou expirado.",
                status: 401
            });
        }
        if (!isAllStringFields) {
            throw new ValidationError({
                message: "Invalid some record field type",
                clientMessage: "Algum campo do registro não é válido (string)",
                status: 422
            });
        }
        const initAsDate = new Date(init);
        const endAsDate = new Date(end);
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(initAsDate) || (end && !isValidDate(endAsDate))) {
            throw new ValidationError({
                message: "Failed to build record init/end fields",
                clientMessage: "As datas nos campos 'início'/'fim' são inválidas.",
                status: 422
            });
        }
        return {
            userId,
            actionName,
            observations,
            init: initAsDate,
            end: endAsDate
        };
    }
}
