import { IUserRepository } from "@/application/repositories/user-repository";

export class RequestRecoverUsecase {
    private userRepository: IUserRepository;
    constructor(repository: IUserRepository) {
        this.userRepository = repository.getCustomRepository();
    }

    async exec(email: string): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error("Nenhuma conta cadastrada com este email.");
            }
			// TODO: Implementar integração com lib de email:
            // await sendEmail(createTemplate(user.email, user.password));
            console.log("email sent...");;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
