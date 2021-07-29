import {MigrationInterface, QueryRunner} from "typeorm";

export class temaUnidad1621900771423 implements MigrationInterface {
    name = 'temaUnidad1621900771423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tema_unidad` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Descripcion` varchar(255) NOT NULL, `Indice` int NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `unidadCursoId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tema_unidad` ADD CONSTRAINT `FK_faf3d71fc81aaeb7d5b0124c5f4` FOREIGN KEY (`unidadCursoId`) REFERENCES `unidad_curso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tema_unidad` DROP FOREIGN KEY `FK_faf3d71fc81aaeb7d5b0124c5f4`");
        await queryRunner.query("DROP TABLE `tema_unidad`");
    }

}
