import { IPasswordRecover, IAuthPassRecoverInput } from "./types";
import { UserRepository } from "@/infra/repositories/user-repository";
import { ok, error } from "@/utils";

export class PasswordRecover implements IPasswordRecover {
    // TODO: Adicionar dependencia do envio de email
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async exec(input: IAuthPassRecoverInput) {
        const { email } = input;
        const userRepository = this.userRepository.getCustomRepository();
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            return error({ status: 400, message: "email not found" });
        }

        // TODO: Implementar integração com lib de email:
        // await sendEmail(createTemplate(user.email, user.password));
        console.log("email sent...");
        return ok(true);
    }
}
