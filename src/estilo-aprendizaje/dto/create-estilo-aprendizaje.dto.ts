import {IsNotEmpty} from "class-validator";

export class CreateEstiloAprendizajeDto {
    @IsNotEmpty()
    Nombre: string;
}
