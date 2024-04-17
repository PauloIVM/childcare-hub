import { IAuthLoginInput, ILogin } from "./types";
import { UserRepository } from "../../../infra/repositories/user-repository";
import { ok, error } from "../../../utils";

const MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;

// TODO: Testar se pra cada chamada vai realmente criar um novo userRepository,
// na real isso é um teste automatizado interessante pro InjectorFactory...

// TODO: Talvez um nome melhor pra esse usecase seja: create-user-session

// TODO: A maneira como estou invertendo as dependências n faz sentido. O próprio usecase
// define e implementa a interface ILogin... a ideia deveria ser usar uma interface quando
// eu ainda não sei a implementação... aqui se torna desnecessário. Por outro lado, a tipagem
// do repository não se dá via interface... o que é um problema. As atuais pastas "repositories"
// e "enities" são da camada de infra, pois são as implementações concretas do banco. Na camada
// dos usecases eu deveria apenas definir a interface dos repositories. Nos controllers, n tem
// problema eu importar diretamente o usecase... o que não pode rolar é o contrário.

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
        // TODO: Esses errors no formato de records não estão sendo muito úteis pra mim,
        // refatorar no futuro.
        // INFO: Ao invés desse sistema de errors confuso, posso apenas lançar exceções e
        // capturar a mensagem no controller.
        if (!user) {
            return error({
                status: 401,
                message: "invalid login",
                errors: {
                    email: "Ops, parece que seu email ou senha não conferem.",
                },
            });
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
