import { IBabyRecordRepository } from "@/application/repositories";
import { ValidationError } from "@/domain";

export class DeleteBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository;
    }

    async exec(id: string, userId: string) {
        const recordToChange = await this.babyRecordRepository.findById(id);
        if (userId !== recordToChange.userId) {
            throw new ValidationError({
                message: "You have not permission to delete this record",
                clientMessage: "Você não têm permissão para apagar este registro",
                status: 403
            });
        }
        const result = await this.babyRecordRepository.deleteRecord(id);
        if (!result) {
            throw new ValidationError({
                message: "Failed to delete record on 'babyRecordRepository.delete'",
                clientMessage: "Falhou em apagar o registro.",
                status: 409
            });
        }
    }
}
