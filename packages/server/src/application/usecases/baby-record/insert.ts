import { IBabyRecordRepository } from "@/application/repositories";
import { IBabyRecordDTO } from "@/application/dtos";
import { ValidationError } from "@/domain";

export class InsertBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository;
    }

    async exec(recordFields: IBabyRecordDTO) {
        const result = await this.babyRecordRepository.insertRecord(recordFields);
        if (!result) {
            throw new ValidationError({
                message: "Failed to insert record on 'babyRecordRepository.insert'",
                clientMessage: "Falhou em inserir o registro.",
                status: 400
            });   
        }
    }
}
