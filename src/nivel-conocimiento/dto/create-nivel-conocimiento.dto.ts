import {IsNotEmpty} from "class-validator";

export class CreateNivelConocimientoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    Descripcion: string;
}
