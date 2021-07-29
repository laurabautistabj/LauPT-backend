import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntaAlumnoCursa1624113764910 implements MigrationInterface {
    name = 'preguntaAlumnoCursa1624113764910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` ADD `preguntasId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` ADD CONSTRAINT `FK_586f6bc8253300e28b746ca9da4` FOREIGN KEY (`preguntasId`) REFERENCES `preguntas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` DROP FOREIGN KEY `FK_586f6bc8253300e28b746ca9da4`");
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` DROP COLUMN `preguntasId`");
    }

}
