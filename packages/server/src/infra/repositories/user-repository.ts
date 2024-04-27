/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { User } from "@/domain";
import { IUserRepository } from "@/application/repositories";
import { IUserDTO } from "@/application/dtos";
import { UserModel } from "@/infra/models";

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> implements IUserRepository {
    public getCustomRepository() {
        return getCustomRepository(UserRepository);
    }

    public async findById(id: string): Promise<User> {
        const userModel = await this.findOne({ where: { id } });
        if (!userModel) return;
        return User.restore(
            userModel.id,
            userModel.userName,
            userModel.email,
            userModel.passwordHash
        );
    }

    public async findByEmail(email: string): Promise<User> {
        const userModel = await this.findOne({ where: { email } });
        if (!userModel) return;
        return User.restore(
            userModel.id,
            userModel.userName,
            userModel.email,
            userModel.passwordHash
        );
    }

    public async saveUser({ name, email, password }: IUserDTO): Promise<User> {
        const userModel = UserModel.build({ createdAt: new Date(), updatedAt: new Date() });
        const user = User.create(userModel.id, name, email, password);
        userModel.email = email;
        userModel.userName = name;
        userModel.passwordHash = user.password.hash;
        await this.save(userModel);
        return user;
    }
}
