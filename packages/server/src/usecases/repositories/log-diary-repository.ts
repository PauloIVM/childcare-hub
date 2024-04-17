import { LogDiary } from "../../domain/log-diary";

export interface ILogDiaryRepository {
    findById(userId: string): Promise<LogDiary>;
    findByUserId(userId: string): Promise<LogDiary[]>;
    insertLog(log: LogDiary): Promise<boolean>;
    updateLog(id: string, fields: Partial<LogDiary>): Promise<boolean>;
    deleteLog(id: string): Promise<boolean>;
    getCustomRepository(): ILogDiaryRepository;
}
