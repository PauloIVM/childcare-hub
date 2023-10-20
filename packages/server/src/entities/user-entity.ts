/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export default class User {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ type: "varchar", name: "user_name", length: 60, nullable: true })
    public userName!: string;

    @Index()
    @Column({
        type: "varchar",
        name: "email",
        length: 150,
        nullable: true,
        unique: true,
    })
    public email!: string;

    @Column({
        type: "char",
        name: "password_hash",
        length: 60,
        nullable: true,
    })
    public passwordHash!: string;

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

    public static build(this: new () => User, params: Partial<User>): User {
        return Object.assign(new this(), params);
    }
}
