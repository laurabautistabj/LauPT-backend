import {MigrationInterface, QueryRunner} from "typeorm";

export class cursos1621896589982 implements MigrationInterface {
    name = 'cursos1621896589982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `curso` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Descripcion` varchar(255) NOT NULL, `Activa` tinyint NOT NULL DEFAULT 0, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `profesorId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `curso` ADD CONSTRAINT `FK_942d4c91f09d93a3a4ef6335701` FOREIGN KEY (`profesorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `curso` DROP FOREIGN KEY `FK_942d4c91f09d93a3a4ef6335701`");
        await queryRunner.query("DROP TABLE `curso`");
    }

}
