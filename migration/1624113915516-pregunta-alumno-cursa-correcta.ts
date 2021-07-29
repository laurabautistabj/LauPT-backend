import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntaAlumnoCursaCorrecta1624113915516 implements MigrationInterface {
    name = 'preguntaAlumnoCursaCorrecta1624113915516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` ADD `Correcta` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` DROP COLUMN `Correcta`");
    }

}
