import {MigrationInterface, QueryRunner} from "typeorm";

export class preguntas1621388329201 implements MigrationInterface {
    name = 'preguntas1621388329201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `preguntas` (`id` varchar(36) NOT NULL, `Pregunta` varchar(255) NOT NULL, `Multiple` tinyint NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `preguntas`");
    }

}
