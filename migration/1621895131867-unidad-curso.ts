import {MigrationInterface, QueryRunner} from "typeorm";

export class unidadCurso1621895131867 implements MigrationInterface {
    name = 'unidadCurso1621895131867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `unidad_curso` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Descripcion` varchar(255) NOT NULL, `Indice` int NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `unidadAprendizajeId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `unidad_curso` ADD CONSTRAINT `FK_91f3fc3ae54d81184332bf11ce0` FOREIGN KEY (`unidadAprendizajeId`) REFERENCES `unidad_aprendizaje`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_curso` DROP FOREIGN KEY `FK_91f3fc3ae54d81184332bf11ce0`");
        await queryRunner.query("DROP TABLE `unidad_curso`");
    }

}
