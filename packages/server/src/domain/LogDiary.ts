export class LogDiary {
    public readonly userId: string;
    public readonly action: string;
    public readonly observations: string;
    public readonly init: Date;
    public readonly end: Date;

    constructor(userId: string, action: string, observations: string, init: Date, end: Date) {
        this.userId = userId;
        this.action = action;
        this.observations = observations;
        this.init = init;
        this.end = end;
    }
}
