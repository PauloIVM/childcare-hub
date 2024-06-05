/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity({ name: "babies" })
export class BabiesModel {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ type: "varchar", name: "name", length: 60, nullable: true })
    public userName!: string;

    @Column({
        type: "varchar",
        name: "name",
        length: 60,
        nullable: true,
    })
    public name!: string;

    @Column({
        type: "char",
        name: "gender",
        length: 1,
        nullable: true,
    })
    public gender!: string;

    @Column({
        type: "timestamp",
        name: "birthday",
    })
    public birthday!: Date;

    @UpdateDateColumn({
        type: "timestamp",
        name: "updated_at",
    })
    public updatedAt!: Date;

    @CreateDateColumn({
        type: "timestamp",
        name: "created_at",
    })
    public createdAt!: Date;

    public static build(this: new () => BabiesModel, params: Partial<BabiesModel>): BabiesModel {
        return Object.assign(new this(), params);
    }
}
