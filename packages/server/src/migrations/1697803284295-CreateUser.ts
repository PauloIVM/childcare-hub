import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1697803284295 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        if (table) {
            return;
        }

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "char",
                        length: "36",
                        isNullable: false,
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: "user_name",
                        type: "varchar",
                        length: "60",
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "150",
                        isUnique: true,
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "password_hash",
                        type: "char",
                        length: "60",
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            "users",
            new TableIndex({
                name: "users_index",
                columnNames: ["email"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "users_index");
        await queryRunner.dropTable("users");
    }
}
