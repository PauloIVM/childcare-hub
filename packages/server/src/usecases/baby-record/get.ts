import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class GetBabyRecordsUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(
        userId: string,
        skip: number,
        limit: number,
    ): Promise<BabyRecord[]> {
        try {
            const records = await this.babyRecordRepository
                .findByUserId(userId, skip, limit);
            return records;
        } catch (error) {
            throw new Error("Failed to get records on 'babyRecordRepository.findByUserId'");
        }
    }
}
