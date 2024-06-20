import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateBabies1697803284295 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("babies");
        if (table) {
            return;
        }

        await queryRunner.createTable(
            new Table({
                name: "babies",
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
                        name: "name",
                        type: "varchar",
                        length: "60",
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: "gender",
                        type: "char",
                        length: "1",
                        isNullable: true,
                        default: "''",
                        collation: "utf8_unicode_ci",
                    },
                    {
                        name: "birthday",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("babies", "babies_index");
        await queryRunner.dropTable("babies");
    }
}
