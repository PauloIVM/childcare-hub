import { User } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";
import { IUserDTO } from "@/application/ports/dtos";
import { IUsersDataMapper } from "@/interface-adapters/ports/data-mappers";
import { v4 as uuid } from "uuid";

export class UserRepository implements IUserRepository {
    private mapper: IUsersDataMapper;

    constructor(mapper: IUsersDataMapper) {
        this.mapper = mapper;
    }

    public async findById(id: string): Promise<User> {
        const userModel = await this.mapper.findOne({ id });
        if (!userModel) return;
        return User.restore(
            userModel.id,
            userModel.name,
            userModel.email,
            userModel.password_hash
        );
    }

    public async findByEmail(email: string): Promise<User> {
        const userModel = await this.mapper.findOne({ email });
        if (!userModel) return;
        return User.restore(
            userModel.id,
            userModel.name,
            userModel.email,
            userModel.password_hash
        );
    }

    public async saveUser({ name, email, password }: IUserDTO): Promise<User> {
        const user = User.create(uuid(), name, email, password);
        await this.mapper.save({
            id: user.id,
            name: user.userName,
            email: user.email,
            password_hash: user.password.hash,
            updated_at: new Date(),
            created_at: new Date(),
        });
        return user;
    }

    public async updateUser(user: User): Promise<boolean> {
        return this.mapper.update({
            name: user.userName,
            email: user.email,
            password_hash: user.password.hash,
            updated_at: new Date(),
        }, { id: user.id });
    }
}
