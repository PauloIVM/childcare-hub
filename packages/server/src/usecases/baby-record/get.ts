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
    ): Promise<{ records: BabyRecord[]; count: number; }> {
        try {
            const records = await this.babyRecordRepository
                .findByUserId(userId, skip, limit);
            const count = await this.babyRecordRepository.getCount(userId);
            return { records, count };
        } catch (error) {
            throw new Error("Failed to get records on 'babyRecordRepository.findByUserId'");
        }
    }
}
