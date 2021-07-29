import {MigrationInterface, QueryRunner} from "typeorm";

export class alumnoCursaResultado1624123291708 implements MigrationInterface {
    name = 'alumnoCursaResultado1624123291708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Calificacion` float NOT NULL");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Aprobado` tinyint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Aprobado`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Calificacion`");
    }

}
