import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelConocimientoService } from './nivel-conocimiento.service';
import { CreateNivelConocimientoDto } from './dto/create-nivel-conocimiento.dto';
import { UpdateNivelConocimientoDto } from './dto/update-nivel-conocimiento.dto';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";

@Controller('nivel-conocimiento')
export class NivelConocimientoController {
  constructor(private readonly nivelConocimientoService: NivelConocimientoService) {}

  @Post()
  @Roles(AppRoles.ADMIN)
  create(@Body() createNivelConocimientoDto: CreateNivelConocimientoDto) {
    return this.nivelConocimientoService.create(createNivelConocimientoDto);
  }

  @Get()
  findAll() {
    return this.nivelConocimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelConocimientoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelConocimientoDto: UpdateNivelConocimientoDto) {
    return this.nivelConocimientoService.update(+id, updateNivelConocimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelConocimientoService.remove(+id);
  }
}
