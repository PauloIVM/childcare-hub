export interface IBabyRecordDTO {
    recordId?: string;
    babyId: string;
    observations: string;
    actionName: string;
    init: Date;
    end?: Date;
    temperature?: number;
    height?: number;
    weight?: number;
    sleepQuality?: string;
    breastfeedingType?: string;
    breastfeedingAmount?: number;
}
