import { ILogDiaryRepository } from "../repositories/log-diary-repository";
import { ok, error } from "../../utils";

export class DeleteLogUsecase {
    private logDiaryRepository: ILogDiaryRepository;
    constructor(logDiaryRepository: ILogDiaryRepository) {
        this.logDiaryRepository = logDiaryRepository;
    }

    async exec(id: string) {
        const result = await this.logDiaryRepository.deleteLog(id);
        if (!result) {
            return error({
                // Status é algo do http, n deveria estar aqui...
                status: 401,
                message: "invalid log",
                errors: {
                    log: "Não foi possível deletar o log.",
                },
            });
        }
        return ok({});
    }
}
