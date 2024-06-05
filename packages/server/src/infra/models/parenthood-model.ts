/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    Entity,
    Index,
    PrimaryColumn,
} from "typeorm";

@Entity({ name: "parenthood" })
export class UserModel {
    @PrimaryColumn({
        type: "varchar",
        name: "id",
        length: 72,
    })
    id: string;

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

    public static build(this: new () => UserModel, params: Partial<UserModel>): UserModel {
        return Object.assign(new this(), params);
    }
}
