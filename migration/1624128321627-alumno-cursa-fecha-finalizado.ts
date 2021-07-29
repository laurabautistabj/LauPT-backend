import {MigrationInterface, QueryRunner} from "typeorm";

export class alumnoCursaFechaFinalizado1624128321627 implements MigrationInterface {
    name = 'alumnoCursaFechaFinalizado1624128321627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `FechaFinalizado` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `FechaFinalizado`");
    }

}
