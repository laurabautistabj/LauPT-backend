import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Preguntas {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'Pregunta'})
    Pregunta: string;

    @Column({name: 'Multiple', type: "boolean"})
    Multiple: boolean;

    @Column({name: 'Imagen', nullable: true})
    Imagen: string;

    @Column({name: 'Activo', type: "boolean", default: true})
    Activo: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
