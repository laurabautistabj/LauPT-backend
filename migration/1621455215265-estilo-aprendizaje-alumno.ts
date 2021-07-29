import {MigrationInterface, QueryRunner} from "typeorm";

export class estiloAprendizajeAlumno1621455215265 implements MigrationInterface {
    name = 'estiloAprendizajeAlumno1621455215265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `estilo_aprendizaje_alumno` (`id` varchar(36) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `estiloId` varchar(255) NULL, `alumnoId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `estilo_aprendizaje_alumno` ADD CONSTRAINT `FK_1f17e29deef2ecdcecac1ad92ed` FOREIGN KEY (`estiloId`) REFERENCES `estilo_aprendizaje`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `estilo_aprendizaje_alumno` ADD CONSTRAINT `FK_bfe52e88f4f46a089448a9fffac` FOREIGN KEY (`alumnoId`) REFERENCES `alumno`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `estilo_aprendizaje_alumno` DROP FOREIGN KEY `FK_bfe52e88f4f46a089448a9fffac`");
        await queryRunner.query("ALTER TABLE `estilo_aprendizaje_alumno` DROP FOREIGN KEY `FK_1f17e29deef2ecdcecac1ad92ed`");
        await queryRunner.query("DROP TABLE `estilo_aprendizaje_alumno`");
    }

}
