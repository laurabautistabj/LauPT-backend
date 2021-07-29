import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

@Entity()
export class Respuestas {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => Preguntas)
    Pregunta: Preguntas;

    @Column({name: 'Respuesta'})
    Respuesta: string;

    @Column({name: 'Correcta', type: "boolean"})
    Correcta: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
