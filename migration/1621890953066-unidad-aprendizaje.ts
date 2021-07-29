import {MigrationInterface, QueryRunner} from "typeorm";

export class unidadAprendizaje1621890953066 implements MigrationInterface {
    name = 'unidadAprendizaje1621890953066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `unidad_aprendizaje` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Activa` tinyint NOT NULL DEFAULT 0, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `profesorId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `unidad_aprendizaje` ADD CONSTRAINT `FK_c05ecedd1d4f937d6b4595848c0` FOREIGN KEY (`profesorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `unidad_aprendizaje` DROP FOREIGN KEY `FK_c05ecedd1d4f937d6b4595848c0`");
        await queryRunner.query("DROP TABLE `unidad_aprendizaje`");
    }

}
