/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index
} from "typeorm";
import { UserModel } from "./user-model";
import { LogDiary } from "../../domain/log-diary";

@Entity({ name: "log_diary" })
export class LogDiaryModel implements LogDiary {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Index()
    @Column({
        type: "varchar",
        name: "user_id",
        length: 36,
    })
    public userId!: string;

    @ManyToOne(() => UserModel, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: UserModel;

    @Column({
        type: "varchar",
        name: "action",
        length: 150,
        nullable: true,
    })
    // TODO: Tem como passar essa validação pro DB pra garantir mais integridade?
    public action!: string;

    @Column({
        type: "varchar",
        name: "observations",
        length: 150,
        nullable: true,
    })
    public observations!: string;

    @Column({
        type: "timestamp",
        name: "init_at",
    })
    public init!: Date;

    @Column({
        type: "timestamp",
        name: "end_at",
    })
    public end!: Date;

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

    public static build(this: new () => LogDiaryModel, params: Partial<LogDiaryModel>): LogDiaryModel {
        return Object.assign(new this(), params);
    }
}
