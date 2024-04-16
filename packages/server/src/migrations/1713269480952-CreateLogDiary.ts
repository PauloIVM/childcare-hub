import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateLogDiary1713269480952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "log_diary",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "255",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "action",
                        type: "varchar",
                        length: "150",
                    },
                    {
                        name: "observations",
                        type: "varchar",
                        length: "150",
                    },
                    {
                        name: "init_at",
                        type: "timestamp",
                    },
                    {
                        name: "end_at",
                        type: "timestamp",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            "log_diary",
            new TableIndex({
                name: "log_diary_user_index",
                columnNames: ["user_id"],
            }),
        );

        await queryRunner.createForeignKey(
            "log_diary",
            new TableForeignKey({
                name: "user_id_fk",
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            "log_diary",
            "log_diary_user_index",
        );
        await queryRunner.dropTable("log_diary");
    }

}
