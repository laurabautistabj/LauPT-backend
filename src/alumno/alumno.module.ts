import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Alumno} from "./entities/alumno.entity";
import {Usuario} from "../usuario/entities/usuario.entity";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
  imports: [TypeOrmModule.forFeature([Alumno]), UsuarioModule],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [TypeOrmModule, AlumnoService]
})
export class AlumnoModule {}
