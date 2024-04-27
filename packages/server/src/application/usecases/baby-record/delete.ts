import { IBabyRecordRepository } from "@/application/repositories";

export class DeleteBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(id: string, userId: string) {
        try {
            const recordToChange = await this.babyRecordRepository.findById(id);
            if (userId !== recordToChange.userId) {
                throw new Error("You have not permission to delete this record");
            }
            const result = await this.babyRecordRepository.deleteRecord(id);
            if (!result) {
                throw new Error("Failed to delete record on 'babyRecordRepository.delete'");    
            }
        } catch (error) {
            throw new Error("Failed to delete record on 'babyRecordRepository.delete'");
        }
    }
}
