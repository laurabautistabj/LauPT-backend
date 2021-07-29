import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntaAlumnoCursaTipoDato1624115444091 implements MigrationInterface {
    name = 'preguntaAlumnoCursaTipoDato1624115444091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Correctas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Correctas` float NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Incorrectas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Incorrectas` float NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Incorrectas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Incorrectas` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Correctas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Correctas` int NOT NULL DEFAULT '0'");
    }

}
