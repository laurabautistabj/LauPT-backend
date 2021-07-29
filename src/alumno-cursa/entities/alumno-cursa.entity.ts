import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn} from "typeorm";
import {Alumno} from "../../alumno/entities/alumno.entity";
import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";

@Entity()
@Unique('alumno_cursa_intento_unique', ['Alumno', 'TemaUnidad', 'NumIntentos'])
export class AlumnoCursa {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => Alumno)
    Alumno: Alumno;

    @ManyToOne(() => TemaUnidad)
    TemaUnidad: TemaUnidad;

    @Column({name: 'NumIntentos', default: 0, type: "int"})
    NumIntentos: number;

    @Column({name: 'TotalPreguntas', default: 0, type: "int"})
    TotalPreguntas: number;

    @Column({name: 'Correctas', default: 0, type: "float"})
    Correctas: number;

    @Column({name: 'Incorrectas', default: 0, type: "float"})
    Incorrectas: number;

    @Column({name: 'Omitidas', default: 0, type: "int"})
    Omitidas: number;

    @Column({name: 'Finalizado', default: false, type: "boolean"})
    Finalizado: boolean;

    @Column({name: 'Calificacion', type: "float"})
    Calificacion: number;

    @Column({name: 'Aprobado', type: "boolean"})
    Aprobado: boolean;

    @Column({name: 'FechaFinalizado', type: 'datetime'})
    FechaFinalizado: Date;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
