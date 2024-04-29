import { BabyRecord } from "@/domain";
import { BabyAction } from "@/domain";
import { IBabyRecordRepository } from "@/application/repositories";

export class GetBabyRecordsUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository;
    }

    async exec(
        userId: string,
        skip: number,
        limit: number,
    ): Promise<{ records: BabyRecord[]; count: number; validActions: BabyAction[] }> {
        const records = await this.babyRecordRepository.findByUserId(userId, skip, limit);
        const count = await this.babyRecordRepository.getCount(userId);
        const validActions = BabyAction.validActions.map((a: string) => new BabyAction(a));
        return { records, count, validActions };
    }
}
