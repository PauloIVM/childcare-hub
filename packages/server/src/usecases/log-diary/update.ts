import { LogDiary } from "../../domain/log-diary";
import { ILogDiaryRepository } from "../repositories/log-diary-repository";

export class UpdateLogUsecase {
    private logDiaryRepository: ILogDiaryRepository;
    constructor(logDiaryRepository: ILogDiaryRepository) {
        this.logDiaryRepository = logDiaryRepository.getCustomRepository();
    }

    async exec(id: string, userId: string, log: Partial<LogDiary>) {
        try {
            const logToChange = await this.logDiaryRepository.findById(id);
            if (userId !== logToChange.userId) {
                throw new Error("You have not permission to change this log");
            }
            const result = await this.logDiaryRepository.updateLog(id, log);
            if (!result) {
                throw new Error("Failed to update log on 'logDiaryRepository.insertLog'");
            }
        } catch (error) {
            throw new Error("Failed to update log on 'logDiaryRepository.insertLog'");
        }
    }
}
