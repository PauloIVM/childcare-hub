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
            const previousUser = await this.userRepository.findByEmail(dto.email);
            if (previousUser) {
                throw new Error(`Já existe um usuário cadastrado com o email ${dto.email}.`);
            }
            const user = await this.userRepository.saveUser(dto);
            // TODO: Criar os ENVs em que eu possa definir esse secret...
            const tokenGenerator = new JwtManager("secret");
			return {
                userName: user.userName,
                userEmail: user.email,
				token: tokenGenerator.sign(user, date)
			};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
