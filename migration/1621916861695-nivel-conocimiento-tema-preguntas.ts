import {MigrationInterface, QueryRunner} from "typeorm";

export class nivelConocimientoTemaPreguntas1621916861695 implements MigrationInterface {
    name = 'nivelConocimientoTemaPreguntas1621916861695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `nivel_conocimiento_tema_pregunta` (`id` varchar(36) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `temaUnidadId` varchar(255) NULL, `nivelConocimientoId` varchar(255) NULL, `preguntaId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` ADD CONSTRAINT `FK_530f75fae0a7045dcddb9eebc98` FOREIGN KEY (`temaUnidadId`) REFERENCES `tema_unidad`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` ADD CONSTRAINT `FK_435894fad70357de2ba4fd6246d` FOREIGN KEY (`nivelConocimientoId`) REFERENCES `nivel_conocimiento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` ADD CONSTRAINT `FK_3b1fb40cc6f5b5ea59742e63a78` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` DROP FOREIGN KEY `FK_3b1fb40cc6f5b5ea59742e63a78`");
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` DROP FOREIGN KEY `FK_435894fad70357de2ba4fd6246d`");
        await queryRunner.query("ALTER TABLE `nivel_conocimiento_tema_pregunta` DROP FOREIGN KEY `FK_530f75fae0a7045dcddb9eebc98`");
        await queryRunner.query("DROP TABLE `nivel_conocimiento_tema_pregunta`");
    }

}
