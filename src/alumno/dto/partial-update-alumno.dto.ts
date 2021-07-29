import {IsNotEmpty} from "class-validator";

export class PartialUpdateAlumnoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    ApPaterno: string;

    @IsNotEmpty()
    ApMaterno: string;

    @IsNotEmpty()
    Direccion: string;

    @IsNotEmpty()
    Sexo: string;

    @IsNotEmpty()
    Telefono: string;

    @IsNotEmpty()
    Foto: string;
}
