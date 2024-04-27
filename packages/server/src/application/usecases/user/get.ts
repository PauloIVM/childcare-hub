import { User } from "@/domain";
import { IUserRepository } from "@/application/repositories";

export class GetUserUsecase {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository.getCustomRepository();
    }

    async exec(userId: string): Promise<User | undefined> {
        try {
            const user = await this.userRepository.findById(userId);
            return user;
        } catch (error) {
            throw new Error("Failed to get user on 'GetUserUsecase'");
        }
    }
}
