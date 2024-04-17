import { LogDiary } from "../../domain/LogDiary";

export interface ILogDiaryRepository {
    findByUserId(userId: string): Promise<LogDiary[]>;
    insertLog(log: LogDiary): Promise<boolean>;
    updateLog(id: string, fields: Partial<LogDiary>): Promise<boolean>;
    deleteLog(id: string): Promise<boolean>;
    getCustomRepository(): ILogDiaryRepository;
}
