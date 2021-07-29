import {AlumnoCursa} from "../../alumno-cursa/entities/alumno-cursa.entity";
import {Respuestas} from "../../respuestas/entities/respuestas.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

export class CreateAlumnoCursaRespuestaDto {
    AlumnoCursa: AlumnoCursa;
    Respuestas: Respuestas;
    Preguntas: Preguntas;
    Correcta: boolean;
}
