import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntaRecursoActivo1622672414498 implements MigrationInterface {
    name = 'preguntaRecursoActivo1622672414498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `preguntas` ADD `Activo` tinyint NOT NULL DEFAULT 1");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` ADD `Activo` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` DROP COLUMN `Activo`");
        await queryRunner.query("ALTER TABLE `preguntas` DROP COLUMN `Activo`");
    }

}
