import { IBabyRecordDTO } from "@/application/dtos";
import { IBabyRecordRepository } from "@/application/repositories";
import { ValidationError } from "@/domain";

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
        const babyRecord = await this.babyRecordRepository.findById(id);
        if (userId !== babyRecord.userId) {
            throw new ValidationError({
                message: "You have not permission to change this record",
                clientMessage: "Você não tem permissão para alterar este registro.",
                status: 403
            });
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
            throw new ValidationError({
                message: "Failed to update record on 'babyRecordRepository.update'",
                clientMessage: "Falhou em atualizar o registro.",
                status: 400
            });
        }
    }
}
