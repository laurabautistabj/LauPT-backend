import {MigrationInterface, QueryRunner} from "typeorm";

export class usuario1621277726089 implements MigrationInterface {
    name = 'usuario1621277726089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `usuario` (`id` varchar(36) NOT NULL, `IdFirebase` varchar(255) NOT NULL, `ApPaterno` varchar(255) NOT NULL, `ApMaterno` varchar(255) NOT NULL, `Correo` varchar(255) NOT NULL, `Direccion` varchar(255) NOT NULL, `Foto` varchar(255) NOT NULL, `Sexo` varchar(255) NOT NULL, `Telefono` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `usuario`");
    }

}
