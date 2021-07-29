import {Preguntas} from "../../preguntas/entities/preguntas.entity";

export class CreateRespuestasDto {
    Pregunta: Preguntas;
    Correcta: boolean;
    Respuesta: string;
}
