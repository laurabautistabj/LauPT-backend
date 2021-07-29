import {MigrationInterface, QueryRunner} from "typeorm";

export class usuario1621290243851 implements MigrationInterface {
    name = 'usuario1621290243851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` ADD `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `usuario` ADD `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `Actualizado`");
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `Creado`");
    }

}
