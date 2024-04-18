export class BabyRecord {
    public readonly id: string;
    public readonly userId: string;
    public readonly action: string;
    public readonly observations: string;
    public readonly init: Date;
    public readonly end: Date;

    // TODO: Uma regra interessante para esse carinha, o end tem q ser maior
    // q o init
    // TODO: O id não é gerado no construtor. Como lidar com isso? Isso me faz perceber que
    // o repository não está instanciando a instância do domain, mas sim retornando o model. Vou
    // precisar mudar isso...
    constructor(userId: string, action: string, observations: string, init: Date, end: Date) {
        this.userId = userId;
        this.action = action;
        this.observations = observations;
        this.init = init;
        this.end = end;
    }
}
