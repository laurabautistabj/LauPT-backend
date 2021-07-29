import {MigrationInterface, QueryRunner} from "typeorm";

export class nivelConocimientoNivel1622155141561 implements MigrationInterface {
    name = 'nivelConocimientoNivel1622155141561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `nivel_conocimiento` ADD `Nivel` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `nivel_conocimiento` DROP COLUMN `Nivel`");
    }

}
