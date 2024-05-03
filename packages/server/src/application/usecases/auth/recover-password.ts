import { JwtManager, ValidationError } from "@/domain";
import { IUserRepository } from "@/application/repositories";

export class RecoverPasswordUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async exec(password: string, token: string, date: Date = new Date()) {
        // TODO: Criar os ENVs em que eu possa definir esse secret...
        const tokenGenerator = new JwtManager("secret");
        const { userId } = tokenGenerator.verify(token);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new ValidationError({
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
            token: tokenGenerator.sign(user, date)
        };
    }
}
