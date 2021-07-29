import {MigrationInterface, QueryRunner} from "typeorm";

export class unidadCurso1621897926564 implements MigrationInterface {
    name = 'unidadCurso1621897926564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_curso` DROP FOREIGN KEY `FK_91f3fc3ae54d81184332bf11ce0`");
        await queryRunner.query("ALTER TABLE `unidad_curso` CHANGE `unidadAprendizajeId` `cursoId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `unidad_curso` ADD CONSTRAINT `FK_71dd018f9a9b9f623be6d92cec6` FOREIGN KEY (`cursoId`) REFERENCES `curso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_curso` DROP FOREIGN KEY `FK_71dd018f9a9b9f623be6d92cec6`");
        await queryRunner.query("ALTER TABLE `unidad_curso` CHANGE `cursoId` `unidadAprendizajeId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `unidad_curso` ADD CONSTRAINT `FK_91f3fc3ae54d81184332bf11ce0` FOREIGN KEY (`unidadAprendizajeId`) REFERENCES `unidad_aprendizaje`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
