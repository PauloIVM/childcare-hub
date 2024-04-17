import { IBabyRecordRepository } from "../repositories/baby-record-repository";

export class DeleteLogUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(id: string, userId: string) {
        try {
            const logToChange = await this.babyRecordRepository.findById(id);
            if (userId !== logToChange.userId) {
                throw new Error("You have not permission to delete this log");
            }
            const result = await this.babyRecordRepository.deleteLog(id);
            if (!result) {
                throw new Error("Failed to delete log on 'babyRecordRepository.insertLog'");    
            }
        } catch (error) {
            throw new Error("Failed to delete log on 'babyRecordRepository.insertLog'");
        }
    }
}
