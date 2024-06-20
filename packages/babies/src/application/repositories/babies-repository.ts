import { Baby } from "@/domain";
import { IBabyDTO } from "@/application/dtos";

export interface IBabiesRepository {
    findById(id: string): Promise<Baby>;
    findByUserId(userId: string): Promise<Baby[]>;
    saveBaby(baby: IBabyDTO): Promise<Baby>;
    updateBaby(baby: Baby): Promise<boolean>;
}
