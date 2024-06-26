import { sign, verify } from "jsonwebtoken";
import { User, BaseError } from "@/domain";

// INFO: Domain Service
export class TokenManager {
	private expiresIn: number;
	private readonly secret: string

	constructor () {
		this.secret = process.env.USER_AUTH_SECRET;
		this.setExpiresInDays(30);
	}

	sign(user: User, date: Date) {
		return sign({
            userId: user.id,
            exp: Math.floor(date.getTime() / 1000) + this.expiresIn
        }, this.secret);
	}

	verify(token: string): { userId: string; } {
		try {
			return verify(token, this.secret) as { userId: string; };
		} catch (error) {
			throw new BaseError({
				message: "Expired or invalid token",
				clientMessage: "Token expirado ou inválido"
			});
		}
	}

	setExpiresInDays(days: number) {
		this.expiresIn = days * 24 * 60 * 60;
		return this;
	}

	setExpiresInHours(hours: number) {
		this.expiresIn = hours * 60 * 60;
		return this;
	}

	setExpiresInMinutes(minutes: number) {
		this.expiresIn = minutes * 60;
		return this;
	}

	setExpiresInSeconds(seconds: number) {
		this.expiresIn = seconds;
		return this;
	}
}
