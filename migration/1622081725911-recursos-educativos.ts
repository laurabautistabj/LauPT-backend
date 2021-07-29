import {MigrationInterface, QueryRunner} from "typeorm";

export class recursosEducativos1622081725911 implements MigrationInterface {
    name = 'recursosEducativos1622081725911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `recursos_educativo` (`id` varchar(36) NOT NULL, `Nombre` varchar(255) NOT NULL, `URL` varchar(255) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `recursos_educativo`");
    }

}
