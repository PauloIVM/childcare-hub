import { User } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";

export class GetUserUsecase {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async exec(userId: string): Promise<User | undefined> {
        const user = await this.userRepository.findById(userId);
        return user;
    }
}
