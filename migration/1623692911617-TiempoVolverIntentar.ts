import {MigrationInterface, QueryRunner} from "typeorm";

export class TiempoVolverIntentar1623692911617 implements MigrationInterface {
    name = 'TiempoVolverIntentar1623692911617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tema_unidad` ADD `TiempoVolverIntentar` int NOT NULL DEFAULT '172800'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tema_unidad` DROP COLUMN `TiempoVolverIntentar`");
    }

}
