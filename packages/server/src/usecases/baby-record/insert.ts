import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class InsertLogUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(log: BabyRecord) {
        try {
            const result = await this.babyRecordRepository.insertLog(log);
            if (!result) {
                throw new Error("Failed to insert log on 'babyRecordRepository.insertLog'");    
            }
        } catch (error) {
            throw new Error("Failed to insert log on 'babyRecordRepository.insertLog'");
        }
    }
}
