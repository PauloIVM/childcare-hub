import { sign, verify } from "jsonwebtoken";
import { User } from "@/domain";

// INFO: Domain Service
export class JwtManager {
	private expiresIn: number;
	// TODO: Esse 'expiresIn' default deveria estar em torno de 16 minutos, mas minha
	// 		 sensação é que dura mais q isso... conferir depois.
	constructor (readonly secret: string, expiresIn: number = 1000000) {
		this.expiresIn = expiresIn;
	}

	sign(user: User, date: Date) {
		return sign({
            userId: user.id,
            iat: date.getTime(),
            expiresIn: this.expiresIn
        }, this.secret);
	}

	verify(token: string): { userId: string; } {
		return verify(token, this.secret) as { userId: string; };
	}

	setExpiresInDays(days: number) {
		this.expiresIn = days * 24 * 60 * 60 * 1000;
		return this;
	}

	setExpiresInHours(hours: number) {
		this.expiresIn = hours * 60 * 60 * 1000;
		return this;
	}

	setExpiresInMinutes(minutes: number) {
		this.expiresIn = minutes * 60 * 1000;
		return this;
	}
}
