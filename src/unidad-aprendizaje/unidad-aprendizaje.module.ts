import { Module } from '@nestjs/common';
import { UnidadAprendizajeService } from './unidad-aprendizaje.service';
import { UnidadAprendizajeController } from './unidad-aprendizaje.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UnidadAprendizaje} from "./entities/unidad-aprendizaje.entity";
import {ProfesorModule} from "../profesor/profesor.module";

@Module({
  imports: [TypeOrmModule.forFeature([UnidadAprendizaje]), ProfesorModule],
  controllers: [UnidadAprendizajeController],
  providers: [UnidadAprendizajeService]
})
export class UnidadAprendizajeModule {}
