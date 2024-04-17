import { BabyRecord } from "../../domain/baby-record";
import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class UpdateLogUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(id: string, userId: string, log: Partial<BabyRecord>) {
        try {
            const logToChange = await this.babyRecordRepository.findById(id);
            if (userId !== logToChange.userId) {
                throw new Error("You have not permission to change this log");
            }
            const result = await this.babyRecordRepository.updateLog(id, log);
            if (!result) {
                throw new Error("Failed to update log on 'babyRecordRepository.insertLog'");
            }
        } catch (error) {
            throw new Error("Failed to update log on 'babyRecordRepository.insertLog'");
        }
    }
}
