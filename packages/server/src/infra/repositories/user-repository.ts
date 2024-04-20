/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory } from "../../utils";
import { UserModel } from "../models/user-model";
import { User } from "../../domain/user";
import bcryptjs from "bcryptjs";

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
    public getCustomRepository() {
        return getCustomRepository(UserRepository);
    }

    public findUserById(id: string): Promise<User> {
        return this.findOne({ where: { id } });
    }

    public findUserByEmail(email: string): Promise<User> {
        return this.findOne({ where: { email } });
    }

    public async findUserByEmailAndPassword(email: string, password: string): Promise<User> {
        const user = await this.findOne({ where: { email } });
        if (!user) return;
        if (bcryptjs.compareSync(password, user.passwordHash)) {
            return user;
        }
    }

    public async saveUser(email: string, pass: string, userName: string): Promise<User> {
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(pass, salt);
        const user = UserModel.build({
            email,
            userName,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.save(user);
        return user;
    }
}

export const userRepositoryFactory = new InjectorFactory(UserRepository);
