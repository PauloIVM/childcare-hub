import { TokenManager, BaseError } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";

export class LoginUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async exec(email: string, password: string, date: Date = new Date()) {
        if (!email || !password) {
            throw new BaseError({
                message: "Missing required fields",
                clientMessage: "Os campos 'email' e 'senha' são obrigatórios."
            });
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user?.password.equals(password)) {
            throw new BaseError({
                message: "Bad email/password.",
                clientMessage: "Email e/ou senha incorretos."
            });
        }
        const tokenManager = new TokenManager();
        return {
            userName: user.userName,
            userEmail: user.email,
            token: tokenManager.sign(user, date)
        };
    }
}
