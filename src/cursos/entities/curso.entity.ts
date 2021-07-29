import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Profesor} from "../../profesor/entities/profesor.entity";

@Entity()
export class Curso {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => Profesor)
    Profesor: Profesor;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'Descripcion'})
    Descripcion: string;

    @Column({name: 'Activa', type: "boolean", default: false})
    Activa: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
