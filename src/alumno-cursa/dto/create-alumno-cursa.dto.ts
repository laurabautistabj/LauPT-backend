import {Alumno} from "../../alumno/entities/alumno.entity";
import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";

export class CreateAlumnoCursaDto {
    Alumno: Alumno;
    TemaUnidad: TemaUnidad;
    NumIntentos: number;
    TotalPreguntas: number;
}
