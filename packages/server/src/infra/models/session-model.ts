/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISession } from "connect-typeorm";
import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryColumn,
} from "typeorm";

@Entity({ name: "session" })
export default class Session implements ISession {
    @Index()
    @Column("bigint", { name: "expired_at" })
    public expiredAt = Date.now();

    @PrimaryColumn("varchar", { length: 255 })
    public id = "";

    @Column("text")
    public json = "";

    @DeleteDateColumn({ name: "destroyed_at" })
    public destroyedAt?: Date;
}
