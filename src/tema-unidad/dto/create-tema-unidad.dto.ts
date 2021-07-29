import {IsNotEmpty} from "class-validator";
import {UnidadCurso} from "../../unidad-curso/entities/unidad-curso.entity";

export class CreateTemaUnidadDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;

    @IsNotEmpty()
    Indice: number;

    @IsNotEmpty()
    TiempoVolverIntentar: number;

    @IsNotEmpty()
    PreguntasPorCuestionario: number;

    UnidadCurso: UnidadCurso;
}
