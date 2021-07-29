import {IsEmail, IsNotEmpty} from "class-validator";
import {Usuario} from "../../usuario/entities/usuario.entity";

export class CreateProfesorDto {
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

    @IsEmail()
    Correo: string;

    @IsNotEmpty()
    Password: string;

    Usuario: Usuario;
}
