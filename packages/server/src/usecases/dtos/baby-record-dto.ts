import { BabyRecord } from "../../domain/baby-record";

export interface IBabyRecordDTO extends Pick<BabyRecord, "observations" | "init" | "end" | "userId"> {
    action: string;
}
