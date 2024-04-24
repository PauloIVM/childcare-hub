import { IBabyRecordRepository } from "../repositories/baby-record-repository";
import { IBabyRecordDTO } from "../dtos/baby-record-dto";

export class InsertBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(recordFields: IBabyRecordDTO) {
        try {
            const result = await this.babyRecordRepository.insertRecord(recordFields);
            if (!result) {
                throw new Error("Failed to insert record on 'babyRecordRepository.insert'");    
            }
        } catch (error) {
            // TODO: Talvez seja interessante concatenar as mensagens de error??
            throw new Error(
                `Failed to insert record on 'babyRecordRepository.insert'. ${error.message}`
            );
        }
    }
}
