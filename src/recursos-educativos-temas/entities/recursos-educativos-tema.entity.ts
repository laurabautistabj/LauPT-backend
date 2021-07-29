import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";
import {RecursosEducativo} from "../../recursos-educativos/entities/recursos-educativo.entity";
import {NivelConocimiento} from "../../nivel-conocimiento/entities/nivel-conocimiento.entity";
import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";
import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";

@Entity()
export class RecursosEducativosTema {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => TemaUnidad)
    TemaUnidad: TemaUnidad;

    @ManyToOne(() => NivelConocimiento)
    NivelConocimiento: NivelConocimiento;

    @ManyToOne(() => EstiloAprendizaje)
    EstiloAprendizaje: EstiloAprendizaje;

    @ManyToOne(() => RecursosEducativo)
    RecursosEducativo: RecursosEducativo;

    @Column({name: 'Activo', type: "boolean", default: true})
    Activo: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
