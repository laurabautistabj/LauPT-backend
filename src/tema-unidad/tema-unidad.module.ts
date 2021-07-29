import {Module} from '@nestjs/common';
import {TemaUnidadService} from './tema-unidad.service';
import {TemaUnidadController} from './tema-unidad.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TemaUnidad} from "./entities/tema-unidad.entity";
import {NivelConocimientoModule} from "../nivel-conocimiento/nivel-conocimiento.module";
import {PreguntasModule} from "../preguntas/preguntas.module";
import {RespuestasModule} from "../respuestas/respuestas.module";
import {NivelConocimientoTemaPreguntasModule} from "../nivel-conocimiento-tema-preguntas/nivel-conocimiento-tema-preguntas.module";
import {AlumnoModule} from "../alumno/alumno.module";
import {EstiloAprendizajeModule} from "../estilo-aprendizaje/estilo-aprendizaje.module";
import {RecursosEducativosModule} from "../recursos-educativos/recursos-educativos.module";
import {RecursosEducativosTemasModule} from "../recursos-educativos-temas/recursos-educativos-temas.module";
import {AlumnoCursaModule} from "../alumno-cursa/alumno-cursa.module";
import {AlumnoCursaRespuestaModule} from "../alumno-cursa-respuesta/alumno-cursa-respuesta.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TemaUnidad]),
        NivelConocimientoModule,
        PreguntasModule,
        RespuestasModule,
        NivelConocimientoTemaPreguntasModule,
        AlumnoModule,
        EstiloAprendizajeModule,
        RecursosEducativosModule,
        RecursosEducativosTemasModule,
        AlumnoCursaModule,
        AlumnoCursaRespuestaModule
    ],
    controllers: [TemaUnidadController],
    providers: [TemaUnidadService],
    exports: [TypeOrmModule, TemaUnidadService]
})
export class TemaUnidadModule {
}
