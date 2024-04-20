import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class UpdateBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(id: string, userId: string, record: Partial<BabyRecord>) {
        try {
            const recordToChange = await this.babyRecordRepository.findById(id);
            if (userId !== recordToChange.userId) {
                throw new Error("You have not permission to change this record");
            }
            const result = await this.babyRecordRepository.updateRecord(id, record);
            if (!result) {
                throw new Error("Failed to update record on 'babyRecordRepository.update'");
            }
        } catch (error) {
            throw new Error("Failed to update record on 'babyRecordRepository.update'");
        }
    }
}
