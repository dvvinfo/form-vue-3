import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Init1758106978725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "submission",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "requestId",
                    type: "varchar",
                },
                {
                    name: "classifier",
                    type: "varchar",
                },
                {
                    name: "formType",
                    type: "varchar",
                },
                {
                    name: "formData",
                    type: "json",
                },
                {
                    name: "submittedAt",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("submission");
    }

}