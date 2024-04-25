import { User } from "@/domain/user";
import { IUserDTO } from "@/application/dtos/user-dto";

export interface IUserRepository {
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: IUserDTO): Promise<User>;
    // TODO: Renomear para "buildRepository" ou algo assim... estudar melhor o que esse
    //       customRepo traz de benefício, para q eu possa dar um bom nome. Talvez um
    //       nome melhor seja "setupORM" ou coisa do tipo...
    getCustomRepository(): IUserRepository;
}
