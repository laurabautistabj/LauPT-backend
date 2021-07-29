import {MigrationInterface, QueryRunner} from "typeorm";

export class alumnoCursaInfo1623777956369 implements MigrationInterface {
    name = 'alumnoCursaInfo1623777956369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Correctas` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Incorrectas` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD `Omitidas` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Omitidas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Incorrectas`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP COLUMN `Correctas`");
    }

}
