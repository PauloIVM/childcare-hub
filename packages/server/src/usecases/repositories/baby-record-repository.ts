import { BabyRecord } from "../../domain/baby-record";

export interface IBabyRecordRepository {
    findById(userId: string): Promise<BabyRecord>;
    findByUserId(userId: string): Promise<BabyRecord[]>;
    insertLog(log: BabyRecord): Promise<boolean>;
    updateLog(id: string, fields: Partial<BabyRecord>): Promise<boolean>;
    deleteLog(id: string): Promise<boolean>;
    getCustomRepository(): IBabyRecordRepository;
}
