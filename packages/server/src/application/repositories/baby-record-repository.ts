import { BabyRecord } from "@/domain";
import { IBabyRecordDTO } from "@/application/dtos";

export interface IBabyRecordRepository {
    findById(id: string): Promise<BabyRecord>;
    findByUserId(userId: string, skip: number, limit: number): Promise<BabyRecord[]>;
    insertRecord(record: IBabyRecordDTO): Promise<BabyRecord>;
    updateRecord(record: BabyRecord): Promise<boolean>;
    deleteRecord(id: string): Promise<boolean>;
    getCount(userId: string): Promise<number>;
    // TODO: Renomear para "buildRepository" ou algo assim... estudar melhor o que esse
    //       customRepo traz de benefício, para q eu possa dar um bom nome. Talvez um
    //       nome melhor seja "setupORM" ou coisa do tipo...
    getCustomRepository(): IBabyRecordRepository;
}
