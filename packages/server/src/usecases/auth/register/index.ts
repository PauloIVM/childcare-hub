import { Maybe, ok, error } from "../../../utils";
import { IRegister, IAuthRegisterInput } from "./types";
import { UserRepository } from "../../../repositories/user-repository";

export class Register implements IRegister {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async exec(input: IAuthRegisterInput) {
        const { session, user } = input;
        const errors = this.validateUser(user);
        const userRepository = this.userRepository.getCustomRepository();
        if (errors) {
            return error({
                status: 400,
                message: "invalid fields",
                errors,
            });
        }
        if (await userRepository.findUserByEmail(user.email)) {
            return error({
                status: 400,
                message: "user already exists",
                errors: {
                    email: "O email fornecido já possui uma conta vinculada.",
                },
            });
        }
        const newUser = await userRepository.saveUser(
            user.email,
            user.password,
            user.userName,
        );
        // INFO: Eu estava bastante na dúvida de como que na "session" do DB, nos cookies,
        // tinham aquelas infos do user... é aqui q está sendo feito. Talvez o mais correto
        // não seria chamar um método do repository? Acho que fica mais intuitivo... mas
        // imagino que isso tbm não esteja errado, deve estar usando uma abstração da lib
        // express-session...
        session.user = {
            id: newUser.id,
            email: newUser.email,
            userName: newUser.userName,
        };
        return ok({ id: session.id, user: session.user });
    }

    private validateUser(
        user: IAuthRegisterInput["user"],
    ): Maybe<Record<string, string>> {
        const errors: Record<string, string> = {};
        if (
            !user?.email ||
            user?.email.length < 5 ||
            !user?.email.includes("@")
        ) {
            errors.email = "O email fornecido é inválido.";
        }
        if (!user?.userName || user?.userName.length < 2) {
            errors.userName = "O nome de usuário fornecido é inválido.";
        }
        if (!user?.password || user?.password.length < 6) {
            errors.password =
                "A senha fornecida é inválida, escolha uma de no mínimo 6 caracteres.";
        }
        if (user?.password !== user?.passwordConfirmation) {
            errors.passwordConfirmation =
                "A confirmação de senha não corresponde com a senha informada, confira possíveis erros de digitação.";
        }
        if (Object.keys(errors).length) {
            return errors;
        }
    }
}
