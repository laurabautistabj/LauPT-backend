import {MigrationInterface, QueryRunner} from "typeorm";

export class estiloAprendizaje1621387081843 implements MigrationInterface {
    name = 'estiloAprendizaje1621387081843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `estilo_aprendizaje` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `estilo_aprendizaje`");
    }

}
