import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateParenthood1713269480953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "parenthood",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "72",
                        isPrimary: true,
                    },
                    {
                        name: "baby_id",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "parent_id",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        default: null
                    }
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "parenthood",
            new TableForeignKey({
                name: "parenthood_baby_id_fk",
                columnNames: ["baby_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "babies",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("baby_records");
    }

}
