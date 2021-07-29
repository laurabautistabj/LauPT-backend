import {Profesor} from "../../profesor/entities/profesor.entity";
import {IsNotEmpty} from "class-validator";
import {UnidadAprendizaje} from "../entities/unidad-aprendizaje.entity";

export class CreateCursoUnidadAprendizajeDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;

    @IsNotEmpty()
    Indice: number;

    UnidadAprendizaje: UnidadAprendizaje;
}
