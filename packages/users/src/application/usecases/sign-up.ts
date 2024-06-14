import { TokenManager, BaseError } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";
import { IServicesNotifierGateway } from "@/application/ports/gateways";
import { IUserDTO } from "@/application/ports/dtos";

export class SignUpUsecase {
    private userRepository: IUserRepository;
    private servicesNotifierGateway: IServicesNotifierGateway;

    constructor(repository: IUserRepository, servicesNotifierGateway: IServicesNotifierGateway) {
        this.userRepository = repository;
        this.servicesNotifierGateway = servicesNotifierGateway;
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
        await this.servicesNotifierGateway.notifyUserCreated(user.id);
        const tokenManager = new TokenManager();
        return {
            userName: user.userName,
            userEmail: user.email,
            token: tokenManager.sign(user, date)
        };
    }
}
