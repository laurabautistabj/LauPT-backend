import {MigrationInterface, QueryRunner} from "typeorm";

export class recursosEducativosTemas1622082793264 implements MigrationInterface {
    name = 'recursosEducativosTemas1622082793264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `recursos_educativos_tema` (`id` varchar(36) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `temaUnidadId` varchar(255) NULL, `nivelConocimientoId` varchar(255) NULL, `estiloAprendizajeId` varchar(255) NULL, `recursosEducativoId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` ADD CONSTRAINT `FK_49593cc5e241c8fa727d9d8c144` FOREIGN KEY (`temaUnidadId`) REFERENCES `tema_unidad`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` ADD CONSTRAINT `FK_3dea368343cf53e73b6e3249dec` FOREIGN KEY (`nivelConocimientoId`) REFERENCES `nivel_conocimiento`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` ADD CONSTRAINT `FK_3117bdf7a1b0748fb976656ef88` FOREIGN KEY (`estiloAprendizajeId`) REFERENCES `estilo_aprendizaje`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` ADD CONSTRAINT `FK_a9fdf14205fa9395122b8d85313` FOREIGN KEY (`recursosEducativoId`) REFERENCES `recursos_educativo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` DROP FOREIGN KEY `FK_a9fdf14205fa9395122b8d85313`");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` DROP FOREIGN KEY `FK_3117bdf7a1b0748fb976656ef88`");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` DROP FOREIGN KEY `FK_3dea368343cf53e73b6e3249dec`");
        await queryRunner.query("ALTER TABLE `recursos_educativos_tema` DROP FOREIGN KEY `FK_49593cc5e241c8fa727d9d8c144`");
        await queryRunner.query("DROP TABLE `recursos_educativos_tema`");
    }

}
