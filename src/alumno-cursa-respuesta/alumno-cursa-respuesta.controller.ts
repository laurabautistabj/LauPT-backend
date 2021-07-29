import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoCursaRespuestaService } from './alumno-cursa-respuesta.service';
import { CreateAlumnoCursaRespuestaDto } from './dto/create-alumno-cursa-respuesta.dto';
import { UpdateAlumnoCursaRespuestaDto } from './dto/update-alumno-cursa-respuesta.dto';

@Controller('alumno-cursa-respuesta')
export class AlumnoCursaRespuestaController {
  constructor(private readonly alumnoCursaRespuestaService: AlumnoCursaRespuestaService) {}

  @Post()
  create(@Body() createAlumnoCursaRespuestaDto: CreateAlumnoCursaRespuestaDto) {
    return this.alumnoCursaRespuestaService.create(createAlumnoCursaRespuestaDto);
  }

  @Get()
  findAll() {
    return this.alumnoCursaRespuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoCursaRespuestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoCursaRespuestaDto: UpdateAlumnoCursaRespuestaDto) {
    return this.alumnoCursaRespuestaService.update(+id, updateAlumnoCursaRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoCursaRespuestaService.remove(+id);
  }
}
