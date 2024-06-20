interface BaseErrorInput {
    message: string;
    clientMessage: string;
    name?: string;
    status?: number;
}

export class BaseError extends Error {
    private _clientMessage: string;
    private _status: number;

    constructor({ message, clientMessage, status, name }: BaseErrorInput) {
        super(message);
        this.name = name || this.constructor.name;
        this._clientMessage = clientMessage;
        this._status = status;
    }

    get status(): number { return this._status; }
    get clientMessage(): string { return this._clientMessage; }
}
