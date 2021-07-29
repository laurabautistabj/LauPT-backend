import {MigrationInterface, QueryRunner} from "typeorm";

export class alumno1621291963834 implements MigrationInterface {
    name = 'alumno1621291963834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno` ADD `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `alumno` ADD `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno` DROP COLUMN `Actualizado`");
        await queryRunner.query("ALTER TABLE `alumno` DROP COLUMN `Creado`");
    }

}
