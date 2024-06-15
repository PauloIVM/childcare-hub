interface ValidationErrorInput {
    message: string;
    clientMessage: string;
    name?: string;
    status?: number;
}

// TODO: Ao invés desse 'validation-error', olhar o BaseError q o deschamps implementou, pode
//       dar ideias interessantes. O domain pode ter um 'base-error', e as outras camadas irem
//       implementando outros errors... ou eu ter uma factory aqui mesmo que cria pra mim diversos
//       tipos de errors.
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
