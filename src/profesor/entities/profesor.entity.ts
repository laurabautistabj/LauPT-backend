import {CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Usuario} from "../../usuario/entities/usuario.entity";

@Entity()
export class Profesor {
    @PrimaryColumn({generated: "uuid"})
    id: string;

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario;

    @CreateDateColumn({name: 'Creado'})
    Creado: Date;

    @UpdateDateColumn({name: 'Actualizado'})
    Actualizado: Date;
}
