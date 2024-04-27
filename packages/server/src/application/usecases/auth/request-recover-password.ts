import { JwtManager } from "@/domain/jwt-manager";
import { IUserRepository } from "@/application/repositories/user-repository";
import { IEmailGateway } from "@/application/gateways";

export class RequestRecoverUsecase {
    private userRepository: IUserRepository;
    private emailGateway: IEmailGateway;
    constructor(repository: IUserRepository, emailGateway: IEmailGateway) {
        this.userRepository = repository.getCustomRepository();
        this.emailGateway = emailGateway;
    }

    async exec(email: string, date: Date = new Date()): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error("Nenhuma conta cadastrada com este email.");
            }
            // TODO: Criar os ENVs em que eu possa definir esse secret...
            // TODO: Aumentar um pouco esse tempo, deixei baixo assim pra eu conseguir testar com mais
            //       facilidade
            const tokenGenerator = new JwtManager("secret").setExpiresInMinutes(5);
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
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
