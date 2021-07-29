import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

@Entity()
export class CuestionarioEstiloAprendizaje {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'Nombre'})
    Nombre: string;

    @ManyToOne(() => EstiloAprendizaje)
    EstiloAprendizaje: EstiloAprendizaje;

    @ManyToOne(() => Preguntas)
    Preguntas: Preguntas;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
