import {IsNotEmpty} from "class-validator";

export class CreateTemaUnidadRecursoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    URL: string;

    @IsNotEmpty()
    NivelConocimiento: string;

    @IsNotEmpty()
    EstiloAprendizaje: string;
}
