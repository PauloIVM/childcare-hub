/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory } from "../utils";
import User from "../entities/user-entity";
import bcryptjs from "bcryptjs";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public getCustomRepository() {
        return getCustomRepository(UserRepository);
    }

    public findUserById(id: string) {
        return this.findOne({ where: { id } });
    }

    public findUserByEmail(email: string) {
        return this.findOne({ where: { email } });
    }

    public async findUserByEmailAndPassword(email: string, password: string) {
        const user = await this.findOne({ where: { email } });
        if (bcryptjs.compareSync(password, user.passwordHash)) {
            return this.findOne({ where: { email, passwordHash: password } });
        }
    }

    public async saveUser(email: string, pass: string, userName: string) {
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(pass, salt);
        const user = User.build({
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
