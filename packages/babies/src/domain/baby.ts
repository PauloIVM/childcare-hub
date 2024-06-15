import { ValidationError } from "@/domain";

export class Baby {
    private _id: string;
    private _name: string;
    private _gender: "male" | "female";
    private _birthday: Date;
    private _parentIds: string[] = [];

    constructor(id: string, name: string, gender: string, birthday: Date, parentIds: string[]) {
        this.setId(id)
            .setName(name)
            .setGender(gender)
            .setBirthday(birthday)
            .addParentIds(parentIds);
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get gender(): string { return this._gender; }
    get birthday(): Date { return this._birthday; }
    get parentIds(): string[] { return this._parentIds; }

    setBirthday(b: Date) { this._birthday=new Date(b); return this; }

    addParentId(parentId: string) {
        this._parentIds.push(parentId);
        return this;
    }

    setGender(gender: string) {
        if (gender !== "male" && gender !== "female") {
            throw new ValidationError({
                message: "Invalid gender.",
                clientMessage: "O gênero fornecido é inválido.",
            });
        }
        this._gender = gender;
        return this;
    }

    setName(name: string) {
        if (!name || name.length < 2) {
            throw new ValidationError({
                message: "Invalid name.",
                clientMessage: "O nome fornecido é inválido.",
            });
        }
        this._name=name;
        return this;
    }

    private setId(id: string) { this._id=id; return this; }

    private addParentIds(parentIds: string[]) {
        parentIds.map(this.addParentId.bind(this));
        return this;
    }
}
