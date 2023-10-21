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
        if (errors) {
            return error({
                status: 400,
                message: "invalid fields",
                errors,
            });
        }
        if (await this.userRepository.findUserByEmail(user.email)) {
            return error({
                status: 400,
                message: "user already exists",
                errors: { email: "already exists" },
            });
        }
        const newUser = await this.userRepository.saveUser(
            user.email,
            user.userName,
            user.password,
        );
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
            errors.email = "invalid email";
        }
        if (!user?.userName || user?.userName.length < 2) {
            errors.firstName = "invalid firstName";
        }
        if (!user?.password || user?.password.length < 6) {
            errors.password = "invalid password";
        }
        if (user?.password !== user?.passwordConfirmation) {
            errors.passwordConfirmation = "invalid passwordConfirmation";
        }
        if (Object.keys(errors).length) {
            return errors;
        }
    }
}
