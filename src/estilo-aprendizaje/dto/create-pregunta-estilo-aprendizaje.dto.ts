import {IsNotEmpty} from "class-validator";

export class CreatePreguntaEstiloAprendizajeDto {
    @IsNotEmpty()
    Pregunta: string;
}
