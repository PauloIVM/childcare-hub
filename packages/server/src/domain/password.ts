import bcryptjs from "bcryptjs";

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
        // TODO: Adicionar regra para conferir caracteres especiais.
        if (password.length < 6) {
            throw new Error("Senha inválida. Escolha uma senha de no mínimo 6 caracteres e com caracteres especiais.")
        }
    }
}
