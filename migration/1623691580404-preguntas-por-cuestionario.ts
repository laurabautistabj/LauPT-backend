import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntasPorCuestionario1623691580404 implements MigrationInterface {
    name = 'preguntasPorCuestionario1623691580404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tema_unidad` ADD `PreguntasPorCuestionario` int NOT NULL DEFAULT '10'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tema_unidad` DROP COLUMN `PreguntasPorCuestionario`");
    }

}
