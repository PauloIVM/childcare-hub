import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class InsertBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(record: BabyRecord) {
        try {
            const result = await this.babyRecordRepository.insertRecord(record);
            if (!result) {
                throw new Error("Failed to insert record on 'babyRecordRepository.insert'");    
            }
        } catch (error) {
            throw new Error("Failed to insert record on 'babyRecordRepository.insert'");
        }
    }
}
