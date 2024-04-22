import { BabyAction } from "./baby-action";

export class BabyRecord {
    public readonly id: string;
    public readonly userId: string;
    public readonly action: BabyAction;
    public readonly observations: string;
    public readonly init: Date;
    public readonly end?: Date;

    constructor(
        id: string,
        userId: string,
        action: string,
        observations: string,
        init: Date,
        end?: Date
    ) {
        if (!!end && end.getTime() < init.getTime()) {
            throw Error("'end' field must be grater than 'init'");
        }
        this.id = id;
        this.userId = userId;
        this.action = new BabyAction(action);
        this.observations = observations;
        this.init = init;
        this.end = end;
    }
}
