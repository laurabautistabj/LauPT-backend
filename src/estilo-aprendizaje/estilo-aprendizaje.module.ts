import { Module } from '@nestjs/common';
import { EstiloAprendizajeService } from './estilo-aprendizaje.service';
import { EstiloAprendizajeController } from './estilo-aprendizaje.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstiloAprendizaje} from "./entities/estilo-aprendizaje.entity";
import {PreguntasModule} from "../preguntas/preguntas.module";
import {RespuestasModule} from "../respuestas/respuestas.module";
import {CuestionarioEstiloAprendizajeModule} from "../cuestionario-estilo-aprendizaje/cuestionario-estilo-aprendizaje.module";

@Module({
  imports: [TypeOrmModule.forFeature([EstiloAprendizaje]), PreguntasModule, RespuestasModule, CuestionarioEstiloAprendizajeModule],
  controllers: [EstiloAprendizajeController],
  providers: [EstiloAprendizajeService],
  exports: [TypeOrmModule, EstiloAprendizajeService]
})
export class EstiloAprendizajeModule {}
