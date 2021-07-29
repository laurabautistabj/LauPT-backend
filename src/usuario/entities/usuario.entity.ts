import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'IdFirebase', nullable: false})
    IdFirebase: string;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'ApPaterno'})
    ApPaterno: string;

    @Column({name: 'ApMaterno'})
    ApMaterno: string;

    @Column({name: 'Correo'})
    Correo: string;

    @Column({name: 'Direccion'})
    Direccion: string;

    @Column({name: 'Foto'})
    Foto: string;

    @Column({name: 'Sexo'})
    Sexo: string;

    @Column({name: 'Telefono'})
    Telefono: string;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
