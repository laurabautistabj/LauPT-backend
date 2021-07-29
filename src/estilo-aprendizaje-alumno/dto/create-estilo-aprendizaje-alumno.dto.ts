import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {Alumno} from "../../alumno/entities/alumno.entity";

export class CreateEstiloAprendizajeAlumnoDto {
    Estilo: EstiloAprendizaje;
    Alumno: Alumno
}
