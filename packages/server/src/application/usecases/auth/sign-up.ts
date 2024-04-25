import { JwtManager } from "@/domain/jwt-manager";
import { IUserRepository } from "@/application/repositories/user-repository";
import { IUserDTO } from "@/application/dtos/user-dto";

export class SignUpUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository.getCustomRepository();
    }

    async exec(dto: IUserDTO, date: Date = new Date()) {
        try {
            const user = await this.userRepository.saveUser(dto);
            // TODO: Criar os ENVs em que eu possa definir esse secret...
            const tokenGenerator = new JwtManager("secret");
			return {
				token: tokenGenerator.sign(user, date)
			};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
