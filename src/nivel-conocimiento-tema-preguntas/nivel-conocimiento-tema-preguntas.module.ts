import { Module } from '@nestjs/common';
import { NivelConocimientoTemaPreguntasService } from './nivel-conocimiento-tema-preguntas.service';
import { NivelConocimientoTemaPreguntasController } from './nivel-conocimiento-tema-preguntas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NivelConocimientoTemaPregunta} from "./entities/nivel-conocimiento-tema-pregunta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NivelConocimientoTemaPregunta])],
  controllers: [NivelConocimientoTemaPreguntasController],
  providers: [NivelConocimientoTemaPreguntasService],
  exports: [TypeOrmModule, NivelConocimientoTemaPreguntasService]
})
export class NivelConocimientoTemaPreguntasModule {}
