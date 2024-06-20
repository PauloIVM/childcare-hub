import bcryptjs from "bcryptjs";
import { BaseError } from "@/domain/base-error";

// INFO: Domain Service
export class Password {
    readonly hash: string;

    private constructor (hash: string) {
        this.hash = hash;
	}

    static create(password: string) {
        this.checkIfIsValid(password);
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(password, salt);
		return new Password(hash);
	}

	static restore(hash: string) {
		return new Password(hash);
	}

    equals(password: string): boolean {
        return bcryptjs.compareSync(password, this.hash);
    }

    private static checkIfIsValid(password: string) {
        if (!/\W/.test(password)) {
            throw new BaseError({
                message: "Invalid password.",
                clientMessage: "Senha inválida. Escolha uma senha com pelo menos 1 caracter especial.",
                status: 400
            });
        }
        if (password.length < 6) {
            throw new BaseError({
                message: "Invalid password.",
                clientMessage: "Senha inválida. Escolha uma senha de no mínimo 6 caracteres.",
                status: 400
            });
        }
    }
}
