import {MigrationInterface, QueryRunner} from "typeorm";

export class usuario1621289962567 implements MigrationInterface {
    name = 'usuario1621289962567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` ADD `Nombre` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario` DROP COLUMN `Nombre`");
    }

}
