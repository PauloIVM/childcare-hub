import { JwtManager, ValidationError } from "@/domain";
import { IUserRepository } from "@/application/repositories";
import { IEmailGateway } from "@/application/gateways";

export class RequestRecoverUsecase {
    private userRepository: IUserRepository;
    private emailGateway: IEmailGateway;
    constructor(repository: IUserRepository, emailGateway: IEmailGateway) {
        this.userRepository = repository;
        this.emailGateway = emailGateway;
    }

    async exec(email: string, date: Date = new Date()): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ValidationError({
                clientMessage: "Nenhuma conta cadastrada com este email.",
                message: "No user with this email."
            });
        }
        // TODO: Criar os ENVs em que eu possa definir esse secret...
        const tokenGenerator = new JwtManager("secret").setExpiresInMinutes(20);
        const token = tokenGenerator.sign(user, date);
        await this.emailGateway.send(
            "Pedido de alteração de senha",
            this.emailGateway.createTemplate(
                `Olá, ${user.userName}. Você solicitou uma alteração de senha.`,
                // TODO: Adicionar o host a um env pra facilitar substituições posteriormente.
                `Acesse <a href='http://localhost:3000/recover/${token}' target='_blank'>este link</a> para cadastrar uma nova senha.`
            ),
            user.email
        );
    }
}
