import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordDTO } from "../dtos/baby-record-dto";

export interface IBabyRecordRepository {
    findById(id: string): Promise<BabyRecord>;
    findByUserId(userId: string, skip: number, limit: number): Promise<BabyRecord[]>;
    insertRecord(record: IBabyRecordDTO): Promise<BabyRecord>;
    updateRecord(record: BabyRecord): Promise<boolean>;
    deleteRecord(id: string): Promise<boolean>;
    getCount(userId: string): Promise<number>;
    getCustomRepository(): IBabyRecordRepository;
}
