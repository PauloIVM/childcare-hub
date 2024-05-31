import { JwtManager, ValidationError } from "@/domain";
import { IUserRepository } from "@/application/repositories";

export class LoginUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async exec(email: string, password: string, date: Date = new Date()) {
        const user = await this.userRepository.findByEmail(email);
        if (!user?.password.equals(password)) {
            throw new ValidationError({
                message: "Bad email/password.",
                clientMessage: "Email e/ou senha incorretos."
            });
        }
        const tokenGenerator = new JwtManager();
        return {
            userName: user.userName,
            userEmail: user.email,
            token: tokenGenerator.sign(user, date)
        };
    }
}
