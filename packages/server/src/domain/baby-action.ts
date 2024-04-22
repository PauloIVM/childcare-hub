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
        "other"
    ];
    constructor(actionName: string) {
        this.name = actionName as BabyAction["name"];
        this.label = BabyAction.parseActionLabel(actionName);
    }
    static parseActionLabel(name: string): string {
        if (!BabyAction.validActions.includes(name as BabyAction["name"])) {
            throw Error("Invalid action name");
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
            "other": "Outro",
        };
        return actionsLabelParser[name as BabyAction["name"]];
    }
}
