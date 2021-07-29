import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class RecursosEducativo {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @Column({name: 'Nombre'})
    Nombre: string;

    @Column({name: 'URL'})
    URL: string;

    @Column({name: 'Activo', type: "boolean", default: true})
    Activo: boolean;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
