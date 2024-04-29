import { BabyAction } from "@/domain";

export class BabyRecord {
    public readonly id: string;
    public readonly userId: string;
    public readonly action: BabyAction;
    private _observations: string;
    private _init: Date;
    private _end?: Date;
    private _temperature?: number;
    private _height?: number;
    private _weight?: number;
    // TODO: Talvez o 'sleepQuality' e 'breastfeedingType' possam virar outras entidades, e
    //       armazenar a label e o value, semelhantemente à 'action'.
    private _sleepQuality?: "very_bad" | "bad" | "ok" | "good" | "very_good";
    private _breastfeedingType?: "left" | "right" | "both" | "bottle";
    private _breastfeedingAmount?: number;

    constructor(
        id: string,
        userId: string,
        actionName: string,
        init: Date,
    ) {
        this.id = id;
        this.userId = userId;
        this.action = new BabyAction(actionName);
        this._init = init;
    }

    setObservations(o: string) {
        this._observations = o;
        return this;
    }
 
    get observations(): string {
        return this._observations;
    }

    setInit(t: Date) {
        this._init = t;
        return this;
    }

    get init(): Date {
        return this._init;
    }

    setEnd(end: Date) {
        if (!end) { return this; }
        if (end.getTime() < this._init.getTime()) {
            throw Error("O campo 'Fim' deve ser maior que o campo 'Início'.");
        }
        this._end = end;
        return this;
    }

    get end(): Date {
        return this._end;
    }

    setTemperature(t: number) {
        this._temperature = t;
        return this;
    }

    get temperature(): number {
        return this._temperature;
    }

    setHeight(h: number) {
        this._height = h;
        return this;
    }

    get height(): number {
        return this._height;
    }

    setWeight(w: number) {
        this._weight = w;
        return this;
    }

    get weight(): number {
        return this._weight;
    }

    setSleepQuality(s: string) {
        if (!s) { return this; }
        if (!["very_bad", "bad", "ok", "good", "very_good"].includes(s)) {
            throw Error("Campo 'Qualidade do sono' inválido.");
        }
        this._sleepQuality = s as BabyRecord["sleepQuality"];
        return this;
    }

    get sleepQuality(): BabyRecord["_sleepQuality"] {
        return this._sleepQuality;
    }

    setBreastfeedingType(b: string) {
        if (!b) { return this; }
        if (!["left", "right", "both", "bottle"].includes(b)) {
            throw Error("Campo 'Tipo de mamada' inválido.");
        }
        this._breastfeedingType = b as BabyRecord["_breastfeedingType"];
        return this;
    }

    get breastfeedingType(): BabyRecord["_breastfeedingType"] {
        return this._breastfeedingType;
    }

    setBreastfeedingAmount(b: number) {
        this._breastfeedingAmount = b;
        return this;
    }

    get breastfeedingAmount(): number {
        return this._breastfeedingAmount;
    }
}
