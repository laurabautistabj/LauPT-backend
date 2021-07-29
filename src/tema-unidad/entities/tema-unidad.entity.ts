import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {UnidadCurso} from "../../unidad-curso/entities/unidad-curso.entity";

@Entity()
export class TemaUnidad {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => UnidadCurso)
    UnidadCurso: UnidadCurso;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'Descripcion'})
    Descripcion: string;

    @Column({name: 'Indice', type: "int"})
    Indice: number;

    @Column({name: 'PreguntasPorCuestionario', type: "int", default: 10})
    PreguntasPorCuestionario: number;

    @Column({name: 'TiempoVolverIntentar', type: "int", default: 172800})
    TiempoVolverIntentar: number;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
