import {MigrationInterface, QueryRunner} from "typeorm";

export class alumnoCursaTotalPreguntas1624119625158 implements MigrationInterface {
    name = 'alumnoCursaTotalPreguntas1624119625158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `TotalPreguntas` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `TotalPreguntas`");
    }

}
