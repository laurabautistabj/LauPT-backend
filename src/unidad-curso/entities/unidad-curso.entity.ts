import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {UnidadAprendizaje} from "../../unidad-aprendizaje/entities/unidad-aprendizaje.entity";
import {Curso} from "../../cursos/entities/curso.entity";

@Entity()
export class UnidadCurso {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @ManyToOne(() => Curso)
    Curso: Curso;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'Descripcion'})
    Descripcion: string;

    @Column({name: 'Indice', type: "int"})
    Indice: number;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
