import {Profesor} from "../../profesor/entities/profesor.entity";
import {IsNotEmpty} from "class-validator";

export class CreateCursoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;

    Profesor: Profesor;
}
