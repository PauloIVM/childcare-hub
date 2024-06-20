import { TokenManager, BaseError } from "@/domain";
import { IUserRepository } from "@/application/ports/repositories";

export class RecoverPasswordUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async exec(password: string, token: string, date: Date = new Date()) {
        if (!token) {
            throw new BaseError({
                message: "Missing auth token.",
                clientMessage: "Token de autenticação não fornecido.",
                status: 401
            });
        }
        if (!password) {
            throw new BaseError({
                message: "Missing password.",
                clientMessage: "O campo 'senha' é obrigatório."
            });
        }
        const tokenManager = new TokenManager();
        const { userId } = tokenManager.verify(token);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new BaseError({
                message: "Could not find user.",
                clientMessage: "Não foi possível encontrar uma conta associada a este token.",
                status: 409
            });
        }
        user.updatePassword(password);
        await this.userRepository.updateUser(user);
        return {
            userName: user.userName,
            userEmail: user.email,
            token: tokenManager.sign(user, date)
        };
    }
}
