import {MigrationInterface, QueryRunner} from "typeorm";

export class unidadAprendizaje1621892368789 implements MigrationInterface {
    name = 'unidadAprendizaje1621892368789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_aprendizaje` ADD `Descripcion` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_aprendizaje` DROP COLUMN `Descripcion`");
    }

}
