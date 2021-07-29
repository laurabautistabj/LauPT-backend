import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Profesor} from "./entities/profesor.entity";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
  imports: [TypeOrmModule.forFeature([Profesor]), UsuarioModule],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [TypeOrmModule, ProfesorService]
})
export class ProfesorModule {}
