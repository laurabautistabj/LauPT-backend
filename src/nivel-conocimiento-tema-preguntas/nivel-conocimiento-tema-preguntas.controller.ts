import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelConocimientoTemaPreguntasService } from './nivel-conocimiento-tema-preguntas.service';
import { CreateNivelConocimientoTemaPreguntaDto } from './dto/create-nivel-conocimiento-tema-pregunta.dto';
import { UpdateNivelConocimientoTemaPreguntaDto } from './dto/update-nivel-conocimiento-tema-pregunta.dto';

@Controller('nivel-conocimiento-tema-preguntas')
export class NivelConocimientoTemaPreguntasController {
  constructor(private readonly nivelConocimientoTemaPreguntasService: NivelConocimientoTemaPreguntasService) {}

  @Post()
  create(@Body() createNivelConocimientoTemaPreguntaDto: CreateNivelConocimientoTemaPreguntaDto) {
    return this.nivelConocimientoTemaPreguntasService.create(createNivelConocimientoTemaPreguntaDto);
  }

  @Get()
  findAll() {
    return this.nivelConocimientoTemaPreguntasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelConocimientoTemaPreguntasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelConocimientoTemaPreguntaDto: UpdateNivelConocimientoTemaPreguntaDto) {
    return this.nivelConocimientoTemaPreguntasService.update(+id, updateNivelConocimientoTemaPreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelConocimientoTemaPreguntasService.remove(+id);
  }
}
