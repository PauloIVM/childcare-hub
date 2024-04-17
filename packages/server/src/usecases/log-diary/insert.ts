import { LogDiary } from "../../domain/LogDiary";
import { ILogDiaryRepository } from "../repositories/log-diary-repository";

export class InsertLogUsecase {
    private logDiaryRepository: ILogDiaryRepository;
    constructor(logDiaryRepository: ILogDiaryRepository) {
        this.logDiaryRepository = logDiaryRepository.getCustomRepository();
    }

    async exec(log: LogDiary) {
        try {
            const result = await this.logDiaryRepository.insertLog(log);
            if (!result) {
                throw new Error("Failed to insert log on 'logDiaryRepository.insertLog'");    
            }
        } catch (error) {
            throw new Error("Failed to insert log on 'logDiaryRepository.insertLog'");
        }
    }
}
