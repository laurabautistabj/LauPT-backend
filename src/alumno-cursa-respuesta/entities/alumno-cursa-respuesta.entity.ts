import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {AlumnoCursa} from "../../alumno-cursa/entities/alumno-cursa.entity";
import {Respuestas} from "../../respuestas/entities/respuestas.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

@Entity()
export class AlumnoCursaRespuesta {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => AlumnoCursa)
    AlumnoCursa: AlumnoCursa;

    @ManyToOne(() => Preguntas)
    Preguntas: Preguntas;

    @ManyToOne(() => Respuestas)
    Respuestas: Respuestas;

    @Column({name: 'Correcta', type: "boolean", default: false})
    Correcta: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
