import { TokenManager, BaseError } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";
import { IUserDTO } from "@/application/ports/dtos";

export class SignUpUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async exec(dto: IUserDTO, date: Date = new Date()) {
        if (!dto.email || !dto.password || !dto.name) {
            throw new BaseError({
                clientMessage: "Os campos 'nome', 'email' e 'senha' são obrigatórios.",
                message: "Missing required fields."
            });
        }
        const previousUser = await this.userRepository.findByEmail(dto.email);
        if (previousUser) {
            throw new BaseError({
                clientMessage: `Já existe um usuário cadastrado com o email ${dto.email}.`,
                message: "Invalid email."
            });
        }
        const user = await this.userRepository.saveUser(dto);
        const tokenManager = new TokenManager();
        return {
            userName: user.userName,
            userEmail: user.email,
            token: tokenManager.sign(user, date)
        };
    }
}
