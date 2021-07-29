import {Profesor} from "../../profesor/entities/profesor.entity";
import {IsNotEmpty} from "class-validator";

export class CreateUnidadAprendizajeDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;

    Profesor: Profesor;
}
