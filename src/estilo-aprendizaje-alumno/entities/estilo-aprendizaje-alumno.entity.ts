import {CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {Alumno} from "../../alumno/entities/alumno.entity";

@Entity()
export class EstiloAprendizajeAlumno {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => EstiloAprendizaje)
    Estilo: EstiloAprendizaje;

    @ManyToOne(() => Alumno)
    Alumno: Alumno;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
