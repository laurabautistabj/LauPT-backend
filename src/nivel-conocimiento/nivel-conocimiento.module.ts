import { Module } from '@nestjs/common';
import { NivelConocimientoService } from './nivel-conocimiento.service';
import { NivelConocimientoController } from './nivel-conocimiento.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NivelConocimiento} from "./entities/nivel-conocimiento.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NivelConocimiento])],
  controllers: [NivelConocimientoController],
  providers: [NivelConocimientoService],
  exports: [TypeOrmModule, NivelConocimientoService]
})
export class NivelConocimientoModule {}
