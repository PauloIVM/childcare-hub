import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateSession1713262594676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "session",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "255",
                        isPrimary: true,
                    },
                    {
                        name: "json",
                        type: "text",
                    },
                    {
                        name: "destroyed_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "expired_at",
                        type: "bigint",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            "session",
            new TableIndex({
                name: "session_expired_at",
                columnNames: ["expired_at"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("session");
        await queryRunner.dropIndex("session", "session_expired_at");
    }

}
