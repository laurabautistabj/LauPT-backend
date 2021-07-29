import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";
import {NivelConocimiento} from "../../nivel-conocimiento/entities/nivel-conocimiento.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

@Entity()
export class NivelConocimientoTemaPregunta {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => TemaUnidad)
    TemaUnidad: TemaUnidad;

    @ManyToOne(() => NivelConocimiento)
    NivelConocimiento: NivelConocimiento;

    @ManyToOne(() => Preguntas)
    Pregunta: Preguntas;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
