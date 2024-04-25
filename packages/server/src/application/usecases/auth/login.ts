import { JwtManager } from "@/domain/jwt-manager";
import { IUserRepository } from "@/application/repositories/user-repository";

export class LoginUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository.getCustomRepository();
    }

    async exec(email: string, password: string, date: Date = new Date()) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user.password.equals(password)) {
                throw new Error("Email e/ou senha incorretos.");
            }
            // TODO: Criar os ENVs em que eu possa definir esse secret...
            const tokenGenerator = new JwtManager("secret");
			return {
				token: tokenGenerator.sign(user, date)
			};
        } catch (error) {
            throw new Error("Failed to delete record on 'babyRecordRepository.delete'");
        }
    }
}
