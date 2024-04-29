import { Password, ValidationError } from "@/domain";

export class User {
    private _id: string;
    private _userName: string;
    private _email: string;
    private _password: Password;

    private constructor() {}

    static create(id: string, name: string, email: string, password: string) {
		return new User()
            .setId(id)
            .setUserName(name)
            .setEmail(email)
            .setPassword(Password.create(password));
	}

	static restore(id: string, name: string, email: string, hash: string) {
		return new User()
            .setId(id)
            .setUserName(name)
            .setEmail(email)
            .setPassword(Password.restore(hash));
	}

    public updatePassword(password: string) {
        return this.setPassword(Password.create(password));
    }

    public updateEmail(email: string) {
        return this.setEmail(email);
    }

    get id(): string { return this._id; }
    get userName(): string { return this._userName; }
    get email(): string { return this._email; }
    get password(): Password { return this._password; }

    private setId(id: string) { this._id=id; return this; }

    private setUserName(userName: string) {
        if (!userName || userName.length < 2) {
            throw new ValidationError({
                message: "Invalid username.",
                clientMessage: "O nome de usuário fornecido é inválido.",
            });
        }
        this._userName=userName;
        return this;
    }

    private setEmail(email: string) {
        if (!this.isEmailValid(email)) {
            throw new ValidationError({
                message: "Invalid email.",
                clientMessage: "O email fornecido é inválido.",
            });
        }
        this._email=email;
        return this;
    }

    private setPassword(password: Password) {
        this._password=password;
        return this;
    }

    private isEmailValid(email: string) {
		return !!String(email)
			.toLowerCase()
			.match(
			    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}
}
