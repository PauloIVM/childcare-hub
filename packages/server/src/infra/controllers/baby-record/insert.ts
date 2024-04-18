import { Request, Response } from "express";
import { BabyRecordRepository } from "../../../infra/repositories/baby-record-repository";
import { InsertBabyRecordUsecase } from "../../../usecases/baby-record/insert";
import { BabyRecord } from "../../../domain/baby-record";

export class InsertBabyRecordController {
    constructor() {}

    async exec(req: Request, res: Response) {
        // INFO: Interface-adapter - Como isolar isso melhor??
        let record: BabyRecord;
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

    // TODO: Acho q esse método aqui n ficou muito legal... preciso descobrir como capturar
    // o error e então definir o status-code.
    private parseReqBody(req: Request): BabyRecord {
        // TODO: Futuramente talvez seja legal eu não puxar esse "session" via middleware,
        // mas via algum service ou usecase. Contudo, pra eu fazer isso, acho q eu mesmo
        // teria que implementar esse tratamento que é feito por essa lib.
        const userId = req.session?.user?.id;
        const {
            action,
            observations,
            init,
            end
        } = req.body as Record<string, string> || {};
        const isAllStringFields = [userId, action, observations, init, end].every((e) => {
            return typeof e === "string";
        });
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
        if (!isValidDate(initAsDate) || !isValidDate(endAsDate)) {
            throw new Error("Failed to build record init/end fields");
        }
        return new BabyRecord(
            userId,
            action,
            observations,
            initAsDate,
            endAsDate
        );
    }
}
