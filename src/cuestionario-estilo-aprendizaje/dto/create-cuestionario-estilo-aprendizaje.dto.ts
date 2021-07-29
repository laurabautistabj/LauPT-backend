import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

export class CreateCuestionarioEstiloAprendizajeDto {
    Nombre: string;
    EstiloAprendizaje: EstiloAprendizaje;
    Preguntas: Preguntas;
}
