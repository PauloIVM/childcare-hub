interface ValidationErrorInput {
    message: string;
    clientMessage: string;
    name?: string;
    status?: number;
}

export class ValidationError extends Error {
    private _clientMessage: string;
    private _status: number;

    constructor({ message, clientMessage, status, name }: ValidationErrorInput) {
        super(message);
        this.name = name || this.constructor.name;
        this._clientMessage = clientMessage;
        this._status = status;
    }

    get status(): number { return this._status; }
    get clientMessage(): string { return this._clientMessage; }
}
