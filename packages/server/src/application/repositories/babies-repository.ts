import { Baby } from "@/domain";
import { IBabyDTO } from "@/application/dtos";

export interface IBabiesRepository {
    findById(id: string): Promise<Baby>;
    saveBaby(user: IBabyDTO): Promise<Baby>;
    updateBaby(user: Baby): Promise<boolean>;
}
