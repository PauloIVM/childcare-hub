/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { BabiesModel } from "./babies-model";

@Entity({ name: "parenthood" })
export class ParenthoodModel {
    @PrimaryColumn({
        type: "varchar",
        name: "id",
        length: 72,
    })
    id!: string;

    @Column({
        type: "varchar",
        name: "parent_id",
        length: 36,
    })
    public parent_id!: string;

    @Column({
        type: "varchar",
        name: "baby_id",
        length: 36,
    })
    public baby_id!: string;

    @ManyToOne(() => BabiesModel, (baby) => baby.parenthoods)
    @JoinColumn({ referencedColumnName: "id", name: "baby_id" })
    baby: BabiesModel;

    public static build(this: new () => ParenthoodModel, p: Omit<ParenthoodModel, "id">): ParenthoodModel {
        return Object.assign(new this(), { ...p, id: `${p.parent_id}${p.baby_id}` });
    }
}
