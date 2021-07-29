import {MigrationInterface, QueryRunner} from "typeorm";

export class alumno1621279491593 implements MigrationInterface {
    name = 'alumno1621279491593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `alumno` (`id` varchar(36) NOT NULL, `Nvl_Conoc` varchar(255) NOT NULL DEFAULT 'Básico', `usuarioId` varchar(255) NULL, UNIQUE INDEX `REL_3e76728f969af94b0f7b0ad670` (`usuarioId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `alumno` ADD CONSTRAINT `FK_3e76728f969af94b0f7b0ad6700` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `alumno` DROP FOREIGN KEY `FK_3e76728f969af94b0f7b0ad6700`");
        await queryRunner.query("DROP INDEX `REL_3e76728f969af94b0f7b0ad670` ON `alumno`");
        await queryRunner.query("DROP TABLE `alumno`");
    }

}
