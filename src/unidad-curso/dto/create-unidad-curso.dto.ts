import {IsNotEmpty} from "class-validator";
import {Curso} from "../../cursos/entities/curso.entity";

export class CreateUnidadCursoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;

    @IsNotEmpty()
    Indice: number;

    Curso: Curso;
}
