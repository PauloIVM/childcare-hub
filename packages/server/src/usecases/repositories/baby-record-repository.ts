import { BabyRecord } from "../../domain/baby-record";

export interface IBabyRecordRepository {
    findById(id: string): Promise<BabyRecord>;
    findByUserId(userId: string, skip: number, limit: number): Promise<BabyRecord[]>;
    insertRecord(record: BabyRecord): Promise<boolean>;
    updateRecord(id: string, fields: Partial<BabyRecord>): Promise<boolean>;
    deleteRecord(id: string): Promise<boolean>;
    getCount(userId: string): Promise<number>;
    getCustomRepository(): IBabyRecordRepository;
}
