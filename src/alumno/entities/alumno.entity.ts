import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "../../usuario/entities/usuario.entity";

export enum NvlConoc {
    BASIC = 'Básico',
    INTERMEDIATE = 'Intermedio',
    ADVANCED = 'Avanzado'
}

@Entity()
export class Alumno {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario;

    @Column({name: 'Nvl_Conoc', default: NvlConoc.BASIC})
    Nvl_Conoc: string;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
