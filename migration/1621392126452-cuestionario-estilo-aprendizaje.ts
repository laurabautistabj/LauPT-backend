import {MigrationInterface, QueryRunner} from "typeorm";

export class cuestionarioEstiloAprendizaje1621392126452 implements MigrationInterface {
    name = 'cuestionarioEstiloAprendizaje1621392126452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `cuestionario_estilo_aprendizaje` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `estiloAprendizajeId` varchar(255) NULL, `preguntasId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `cuestionario_estilo_aprendizaje` ADD CONSTRAINT `FK_22075dceec2b36711ed3c93956f` FOREIGN KEY (`estiloAprendizajeId`) REFERENCES `estilo_aprendizaje`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cuestionario_estilo_aprendizaje` ADD CONSTRAINT `FK_87c4518926f43c39ccb2e2d29ea` FOREIGN KEY (`preguntasId`) REFERENCES `preguntas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cuestionario_estilo_aprendizaje` DROP FOREIGN KEY `FK_87c4518926f43c39ccb2e2d29ea`");
        await queryRunner.query("ALTER TABLE `cuestionario_estilo_aprendizaje` DROP FOREIGN KEY `FK_22075dceec2b36711ed3c93956f`");
        await queryRunner.query("DROP TABLE `cuestionario_estilo_aprendizaje`");
    }

}
