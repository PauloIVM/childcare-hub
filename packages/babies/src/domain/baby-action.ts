import { BaseError } from "@/domain";

export class BabyAction {
    public readonly label: string;
    public readonly name:
        | "sleep"
        | "breastfeed"
        | "change_diapers"
        | "urination"
        | "poop"
        | "bath"
        | "cry"
        | "vaccine"
        | "doctor"
        | "walk"
        | "weight"
        | "height"
        | "temperature"
        | "other";
    static readonly validActions: BabyAction["name"][] = [
        "sleep",
        "breastfeed",
        "change_diapers",
        "urination",
        "poop",
        "bath",
        "cry",
        "vaccine",
        "doctor",
        "walk",
        "weight",
        "height",
        "temperature",
        "other"
    ];
    constructor(actionName: string) {
        this.name = actionName as BabyAction["name"];
        this.label = BabyAction.parseActionLabel(actionName);
    }
    static parseActionLabel(name: string): string {
        if (!BabyAction.validActions.includes(name as BabyAction["name"])) {
            throw new BaseError({
                message: "Invalid action name.",
                clientMessage: "Ação inválida/inexistente."
            });
        }
        const actionsLabelParser: Record<BabyAction["name"], string> = {
            "sleep": "Dormir",
            "breastfeed": "Mamar",
            "change_diapers": "Trocar fralda",
            "urination": "Micção",
            "poop": "Cocô",
            "bath": "Banho",
            "cry": "Choro",
            "vaccine": "Vacina",
            "doctor": "Médico",
            "walk": "Passear",
            "weight": "Peso",
            "height": "Altura",
            "temperature": "Temperatura",
            "other": "Outro",
        };
        return actionsLabelParser[name as BabyAction["name"]];
    }
}
