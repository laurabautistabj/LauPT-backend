import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";
import {NivelConocimiento} from "../../nivel-conocimiento/entities/nivel-conocimiento.entity";
import {Preguntas} from "../../preguntas/entities/preguntas.entity";

export class CreateNivelConocimientoTemaPreguntaDto {
    TemaUnidad: TemaUnidad;
    NivelConocimiento: NivelConocimiento;
    Pregunta: Preguntas;
}
