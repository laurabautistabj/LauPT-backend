import { Module } from '@nestjs/common';
import { EstiloAprendizajeAlumnoService } from './estilo-aprendizaje-alumno.service';
import { EstiloAprendizajeAlumnoController } from './estilo-aprendizaje-alumno.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstiloAprendizajeAlumno} from "./entities/estilo-aprendizaje-alumno.entity";
import {AlumnoModule} from "../alumno/alumno.module";
import {EstiloAprendizajeModule} from "../estilo-aprendizaje/estilo-aprendizaje.module";

@Module({
  imports: [TypeOrmModule.forFeature([EstiloAprendizajeAlumno]), AlumnoModule, EstiloAprendizajeModule],
  controllers: [EstiloAprendizajeAlumnoController],
  providers: [EstiloAprendizajeAlumnoService]
})
export class EstiloAprendizajeAlumnoModule {}
