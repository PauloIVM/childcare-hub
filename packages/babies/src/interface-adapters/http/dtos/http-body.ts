import {
    IBabyDTO,
    IBabyRecordDTO
} from "@/application/dtos";

export type IHttpBody = Record<keyof IBabyRecordDTO | keyof Omit<IBabyDTO, "parentIds">, any>;
