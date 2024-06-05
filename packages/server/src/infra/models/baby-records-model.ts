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
import { BabiesModel } from "@/infra/models";

@Entity({ name: "baby_record" })
export class BabyRecordModel {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Index()
    @Column({
        type: "varchar",
        name: "baby_id",
        length: 36,
    })
    public userId!: string;

    @ManyToOne(() => BabiesModel, (baby) => baby.id)
    @JoinColumn({ name: "baby_id" })
    baby!: BabiesModel;

    @Column({
        type: "varchar",
        name: "action",
        length: 30,
        nullable: true,
    })
    public action!: string;

    @Column({
        type: "varchar",
        name: "observations",
        length: 300,
        nullable: true
    })
    public observations!: string;

    @Column({
        type: "float",
        name: "temperature",
        nullable: true
    })
    public temperature!: number;

    @Column({
        type: "int",
        name: "height",
        nullable: true
    })
    public height!: number;

    @Column({
        type: "int",
        name: "weight",
        nullable: true
    })
    public weight!: number;

    @Column({
        type: "int",
        name: "breastfeeding_amount",
        nullable: true
    })
    public breastfeedingAmount!: number;

    @Column({
        type: "varchar",
        name: "sleep_quality",
        length: 30,
        nullable: true
    })
    public sleepQuality!: string;

    @Column({
        type: "varchar",
        name: "breastfeeding_type",
        length: 30,
        nullable: true
    })
    public breastfeedingType!: string;

    @Column({
        type: "timestamp",
        name: "init_at",
    })
    public init!: Date;

    @Column({
        type: "timestamp",
        name: "end_at",
        nullable: true
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

    public static build(this: new () => BabyRecordModel, params: Partial<BabyRecordModel>): BabyRecordModel {
        return Object.assign(new this(), params);
    }
}
