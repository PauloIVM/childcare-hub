import { Request, Response } from "express";
import { LogDiaryRepository } from "../../../infra/repositories/log-diary-repository";
import { InsertLogUsecase } from "../../../usecases/log-diary/insert";
import { LogDiary } from "../../../domain/log-diary";

export class InsertLogDiaryController {
    constructor() {}

    async exec(req: Request, res: Response) {
        // INFO: Interface-adapter - Como isolar isso melhor??
        let log: LogDiary;
        try {
            log = this.parseReqBody(req);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
        // INFO: Fim do interface-adapter
        try {
            const usecase = new InsertLogUsecase(new LogDiaryRepository());
            await usecase.exec(log);
            res.json({ message: "ok" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    private parseReqBody(req: Request): LogDiary {
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
            throw new Error("Invalid some log field type");
        }
        const initAsDate = new Date(init);
        const endAsDate = new Date(end);
        const isValidDate = (d: Date): boolean => {
            return d instanceof Date && !isNaN(d.getDate());
        }
        if (!isValidDate(initAsDate) || !isValidDate(endAsDate)) {
            throw new Error("Failed to build log init/end fields");
        }
        return new LogDiary(
            userId,
            action,
            observations,
            initAsDate,
            endAsDate
        );
    }
}
