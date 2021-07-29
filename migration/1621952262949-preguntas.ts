import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntas1621952262949 implements MigrationInterface {
    name = 'preguntas1621952262949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `preguntas` ADD `Imagen` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `preguntas` DROP COLUMN `Imagen`");
    }

}
