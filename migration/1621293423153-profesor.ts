import {MigrationInterface, QueryRunner} from "typeorm";

export class profesor1621293423153 implements MigrationInterface {
    name = 'profesor1621293423153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profesor` (`id` varchar(36) NOT NULL, `Creado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `Actualizado` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `usuarioId` varchar(255) NULL, UNIQUE INDEX `REL_96faa0e2e2adb87d53458fe185` (`usuarioId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `profesor` ADD CONSTRAINT `FK_96faa0e2e2adb87d53458fe1855` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `profesor` DROP FOREIGN KEY `FK_96faa0e2e2adb87d53458fe1855`");
        await queryRunner.query("DROP INDEX `REL_96faa0e2e2adb87d53458fe185` ON `profesor`");
        await queryRunner.query("DROP TABLE `profesor`");
    }

}
