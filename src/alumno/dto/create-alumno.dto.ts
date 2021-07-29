import {IsNotEmpty} from "class-validator";
import {Usuario} from "../../usuario/entities/usuario.entity";

export class CreateAlumnoDto {
    @IsNotEmpty()
    Nombre: string;

    @IsNotEmpty()
    ApPaterno: string;

    ApMaterno: string;

    @IsNotEmpty()
    Direccion: string;

    @IsNotEmpty()
    Sexo: string;

    @IsNotEmpty()
    Telefono: string;

    Usuario: Usuario;
}
