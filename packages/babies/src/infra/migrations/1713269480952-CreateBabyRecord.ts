import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateBabyRecords1713269480952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "baby_records",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "255",
                        isPrimary: true,
                    },
                    {
                        name: "baby_id",
                        type: "varchar",
                        length: "36",
                        isNullable: false,
                    },
                    {
                        name: "action",
                        type: "varchar",
                        length: "30",
                        isNullable: false,
                    },
                    {
                        name: "observations",
                        type: "varchar",
                        length: "300",
                        isNullable: true,
                    },
                    {
                        name: "temperature",
                        type: "float4",
                        isNullable: true,
                    },
                    {
                        name: "height",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "weight",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "breastfeeding_amount",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "sleep_quality",
                        type: "varchar",
                        length: "30",
                        isNullable: true,
                    },
                    {
                        name: "breastfeeding_type",
                        type: "varchar",
                        length: "30",
                        isNullable: true,
                    },
                    {
                        name: "init_at",
                        type: "timestamp",
                    },
                    {
                        name: "end_at",
                        type: "timestamp",
                        isNullable: true,
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
            "baby_records",
            new TableIndex({
                name: "baby_records_index",
                columnNames: ["baby_id"],
            }),
        );

        await queryRunner.createForeignKey(
            "baby_records",
            new TableForeignKey({
                name: "baby_id_fk",
                columnNames: ["baby_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "babies",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            "baby_records",
            "baby_records_index",
        );
        await queryRunner.dropTable("baby_records");
    }

}
