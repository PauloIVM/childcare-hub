import { TokenManager, BaseError } from "@/domain";
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
        const expiresInMinutes = 20;
        if (!user) {
            throw new BaseError({
                clientMessage: "Nenhuma conta cadastrada com este email.",
                message: "No user with this email."
            });
        }
        const tokenManager = new TokenManager().setExpiresInMinutes(expiresInMinutes);
        const token = tokenManager.sign(user, date);
        await this.emailGateway.send(
            "Pedido de alteração de senha",
            this.emailGateway.createTemplate(
                `Olá, ${user.userName}. Você solicitou uma alteração de senha.`,
                // TODO: Adicionar o host a um env pra facilitar substituições posteriormente.
                `Acesse <a href='http://localhost:3000/recover/${token}' target='_blank'>este link</a> para cadastrar uma nova senha. Este link expira em ${expiresInMinutes} minutos.`
            ),
            user.email
        );
    }
}
