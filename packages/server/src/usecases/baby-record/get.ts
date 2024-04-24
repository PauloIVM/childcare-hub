import { BabyRecord } from "../../domain/baby-record";
import { BabyAction } from "../../domain/baby-action";
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
    ): Promise<{ records: BabyRecord[]; count: number; validActions: BabyAction[] }> {
        try {
            const records = await this.babyRecordRepository
                .findByUserId(userId, skip, limit);
            const count = await this.babyRecordRepository.getCount(userId);
            const validActions = BabyAction.validActions.map((a: string) => new BabyAction(a));
            return { records, count, validActions };
        } catch (error) {
            throw new Error("Failed to get records on 'babyRecordRepository.findByUserId'");
        }
    }
}
