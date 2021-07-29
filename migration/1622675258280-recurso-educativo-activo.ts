import {MigrationInterface, QueryRunner} from "typeorm";

export class recursoEducativoActivo1622675258280 implements MigrationInterface {
    name = 'recursoEducativoActivo1622675258280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `recursos_educativo` ADD `Activo` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `recursos_educativo` DROP COLUMN `Activo`");
    }

}
