import { IBabyRecordDTO } from "@/application/dtos/baby-record-dto";
import { IBabyRecordRepository } from "@/application/repositories/baby-record-repository";

export class UpdateBabyRecordUsecase {
    private babyRecordRepository: IBabyRecordRepository;
    constructor(babyRecordRepository: IBabyRecordRepository) {
        this.babyRecordRepository = babyRecordRepository.getCustomRepository();
    }

    async exec(
        id: string,
        userId: string,
        recordDTO: Partial<Omit<IBabyRecordDTO, "userId" | "actionName">>
    ) {
        try {
            const babyRecord = await this.babyRecordRepository.findById(id);
            if (userId !== babyRecord.userId) {
                throw new Error("You have not permission to change this record");
            }
            if (recordDTO.end) { babyRecord.setEnd(new Date(recordDTO.end)); }
            if (recordDTO.init) { babyRecord.setInit(new Date(recordDTO.init)); }
            if (recordDTO.observations) { babyRecord.setObservations(recordDTO.observations); }
            if (recordDTO.temperature) { babyRecord.setTemperature(recordDTO.temperature); }
            if (recordDTO.height) { babyRecord.setHeight(recordDTO.height); }
            if (recordDTO.weight) { babyRecord.setWeight(recordDTO.weight); }
            if (recordDTO.sleepQuality) { babyRecord.setSleepQuality(recordDTO.sleepQuality); }
            if (recordDTO.breastfeedingType) { babyRecord.setBreastfeedingType(recordDTO.breastfeedingType); }
            if (recordDTO.breastfeedingAmount) { babyRecord.setBreastfeedingAmount(recordDTO.breastfeedingAmount); }
            const result = await this.babyRecordRepository.updateRecord(babyRecord);
            if (!result) {
                throw new Error("Failed to update record on 'babyRecordRepository.update'");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
