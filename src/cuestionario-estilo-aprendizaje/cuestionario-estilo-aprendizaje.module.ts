import { Module } from '@nestjs/common';
import { CuestionarioEstiloAprendizajeService } from './cuestionario-estilo-aprendizaje.service';
import { CuestionarioEstiloAprendizajeController } from './cuestionario-estilo-aprendizaje.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CuestionarioEstiloAprendizaje} from "./entities/cuestionario-estilo-aprendizaje.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CuestionarioEstiloAprendizaje])],
  controllers: [CuestionarioEstiloAprendizajeController],
  providers: [CuestionarioEstiloAprendizajeService],
  exports: [TypeOrmModule, CuestionarioEstiloAprendizajeService]
})
export class CuestionarioEstiloAprendizajeModule {}
