import {MigrationInterface, QueryRunner} from "typeorm";

export class respuestas1621389024574 implements MigrationInterface {
    name = 'respuestas1621389024574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `respuestas` (`id` varchar(36) NOT NULL, `Respuesta` varchar(255) NOT NULL, `Correcta` tinyint NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `preguntaId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `respuestas` ADD CONSTRAINT `FK_4535801a85d5320e01928722d21` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `respuestas` DROP FOREIGN KEY `FK_4535801a85d5320e01928722d21`");
        await queryRunner.query("DROP TABLE `respuestas`");
    }

}
