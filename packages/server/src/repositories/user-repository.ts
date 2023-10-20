/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import User from "../entities/user-entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public findUserById(id: string) {
        return this.findOne({ where: { id } });
    }

    public findUserByEmail(email: string) {
        return this.findOne({ where: { email } });
    }

    public findUserByEmailAndPassword(email: string, password: string) {
        return this.findOne({ where: { email, password } });
    }

    public async findUserByEmailOrCreate(
        pUser: Pick<User, "email" | "userName">,
    ) {
        if (!pUser) {
            return;
        }

        const user = await this.findUserByEmail(pUser?.email);

        if (user) {
            return user;
        }

        const newUser = User.build({
            email: pUser.email,
            userName: pUser.userName,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await this.createQueryBuilder()
            .insert()
            .values(newUser)
            .orIgnore()
            .execute();
        newUser.id = result.identifiers[0]?.id;

        return newUser;
    }
}

export type GetUserRepository = typeof getUserRepository;

export function getUserRepository(): UserRepository {
    return getCustomRepository(UserRepository);
}
