import { Module } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { PreguntasController } from './preguntas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Preguntas} from "./entities/preguntas.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Preguntas])],
  controllers: [PreguntasController],
  providers: [PreguntasService],
  exports: [TypeOrmModule, PreguntasService]
})
export class PreguntasModule {}
