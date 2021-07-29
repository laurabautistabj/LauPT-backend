import {TemaUnidad} from "../../tema-unidad/entities/tema-unidad.entity";
import {NivelConocimiento} from "../../nivel-conocimiento/entities/nivel-conocimiento.entity";
import {EstiloAprendizaje} from "../../estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {RecursosEducativo} from "../../recursos-educativos/entities/recursos-educativo.entity";


export class CreateRecursosEducativosTemaDto {
    TemaUnidad: TemaUnidad;
    NivelConocimiento: NivelConocimiento;
    EstiloAprendizaje: EstiloAprendizaje;
    RecursosEducativo: RecursosEducativo;
}
