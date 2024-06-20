interface BaseErrorInput {
    message: string;
    clientMessage: string;
    name?: string;
    status?: number;
}

// TODO: Esse status como um number tem uma associação indireta com o status http.
//       O mais correto seria o status ser um array de strings, e no http-server
//       eu converter para o número equivalente.
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
