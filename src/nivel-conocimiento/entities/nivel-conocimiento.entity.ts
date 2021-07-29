import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class NivelConocimiento {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'Descripcion'})
    Descripcion: string;

    @Column({name: 'Nivel', default: 0, type: "int"})
    Nivel: number;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
