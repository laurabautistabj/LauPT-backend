import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class EstiloAprendizaje {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'Nombre'})
    Nombre: string;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
