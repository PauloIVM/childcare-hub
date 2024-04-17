import { LogDiary } from "../../domain/log-diary";
import { ILogDiaryRepository } from "../repositories/log-diary-repository";
import { ok, error } from "../../utils";

export class UpdateLogUsecase {
    private logDiaryRepository: ILogDiaryRepository;
    constructor(logDiaryRepository: ILogDiaryRepository) {
        this.logDiaryRepository = logDiaryRepository;
    }

    async exec(id: string, log: Partial<LogDiary>) {
        const result = await this.logDiaryRepository.updateLog(id, log);
        if (!result) {
            return error({
                // Status é algo do http, n deveria estar aqui...
                status: 401,
                message: "invalid log",
                errors: {
                    log: "Não foi possível atualizar o log.",
                },
            });
        }
        return ok({});
    }
}
