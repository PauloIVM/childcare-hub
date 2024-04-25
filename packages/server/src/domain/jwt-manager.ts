import { sign, verify } from "jsonwebtoken";
import { User } from "./user";

// INFO: Domain Service
export class JwtManager {
	EXPIRES_IN = 1000000;

	constructor (readonly secret: string) {}

	sign(user: User, date: Date) {
		return sign({
            userId: user.id,
            iat: date.getTime(),
            expiresIn: this.EXPIRES_IN
        }, this.secret);
	}

	verify(token: string): { userId: string; } {
		return verify(token, this.secret) as { userId: string; };
	}
}
