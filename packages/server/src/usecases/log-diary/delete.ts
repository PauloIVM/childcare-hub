import { ILogDiaryRepository } from "../repositories/log-diary-repository";

export class DeleteLogUsecase {
    private logDiaryRepository: ILogDiaryRepository;
    constructor(logDiaryRepository: ILogDiaryRepository) {
        this.logDiaryRepository = logDiaryRepository.getCustomRepository();
    }

    async exec(id: string, userId: string) {
        try {
            const logToChange = await this.logDiaryRepository.findById(id);
            if (userId !== logToChange.userId) {
                throw new Error("You have not permission to delete this log");
            }
            const result = await this.logDiaryRepository.deleteLog(id);
            if (!result) {
                throw new Error("Failed to delete log on 'logDiaryRepository.insertLog'");    
            }
        } catch (error) {
            throw new Error("Failed to delete log on 'logDiaryRepository.insertLog'");
        }
    }
}
