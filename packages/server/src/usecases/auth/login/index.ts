import { IAuthLoginInput, ILogin } from "./types";
import { UserRepository } from "../../../repositories/user-repository";
import { ok, error } from "../../../utils";

const MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;

// TODO: Testar se pra cada chamada vai realmente criar um novo userRepository,
// na real isso é um teste automatizado interessante pro InjectorFactory...

export class Login implements ILogin {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async exec(input: IAuthLoginInput) {
        const { email, password, session } = input;
        const userRepository = this.userRepository.getCustomRepository();
        const user = await userRepository.findUserByEmailAndPassword(
            email,
            password,
        );
        if (!user) {
            return error({ status: 401, message: "invalid login" });
        }
        session.user = {
            id: user.id,
            email: user.email,
            userName: user.userName,
        };
        session.cookie.expires = new Date(Date.now() + MONTH_IN_MILLISECONDS);
        return ok({ id: session.id, user: session.user });
    }
}
