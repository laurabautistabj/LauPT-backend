import {MigrationInterface, QueryRunner} from "typeorm";

export class alumnoCursa1622151554854 implements MigrationInterface {
    name = 'alumnoCursa1622151554854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `alumno_cursa` (`id` varchar(36) NOT NULL, `NumIntentos` int NOT NULL DEFAULT '0', `Finalizado` tinyint NOT NULL DEFAULT 0, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `alumnoId` varchar(255) NULL, `temaUnidadId` varchar(255) NULL, UNIQUE INDEX `alumno_cursa_intento_unique` (`alumnoId`, `temaUnidadId`, `NumIntentos`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `alumno_cursa_respuesta` (`id` varchar(36) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `alumnoCursaId` varchar(255) NULL, `respuestasId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD CONSTRAINT `FK_06535c685257fb18a92a461dd9c` FOREIGN KEY (`alumnoId`) REFERENCES `alumno`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `alumno_cursa` ADD CONSTRAINT `FK_551045d060592cc7a027fe7d092` FOREIGN KEY (`temaUnidadId`) REFERENCES `tema_unidad`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` ADD CONSTRAINT `FK_8aa97df492eb4b21e47c5cdac3d` FOREIGN KEY (`alumnoCursaId`) REFERENCES `alumno_cursa`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` ADD CONSTRAINT `FK_14804186746356edda7fc38ede7` FOREIGN KEY (`respuestasId`) REFERENCES `respuestas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` DROP FOREIGN KEY `FK_14804186746356edda7fc38ede7`");
        await queryRunner.query("ALTER TABLE `alumno_cursa_respuesta` DROP FOREIGN KEY `FK_8aa97df492eb4b21e47c5cdac3d`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP FOREIGN KEY `FK_551045d060592cc7a027fe7d092`");
        await queryRunner.query("ALTER TABLE `alumno_cursa` DROP FOREIGN KEY `FK_06535c685257fb18a92a461dd9c`");
        await queryRunner.query("DROP TABLE `alumno_cursa_respuesta`");
        await queryRunner.query("DROP INDEX `alumno_cursa_intento_unique` ON `alumno_cursa`");
        await queryRunner.query("DROP TABLE `alumno_cursa`");
    }

}
