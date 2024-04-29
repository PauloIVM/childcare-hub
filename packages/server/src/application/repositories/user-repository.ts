import { User } from "@/domain";
import { IUserDTO } from "@/application/dtos";

export interface IUserRepository {
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    saveUser(user: IUserDTO): Promise<User>;
    updateUser(user: User): Promise<boolean>;
    getCustomRepository(): IUserRepository;
}
