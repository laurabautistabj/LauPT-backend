import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoCursaService } from './alumno-cursa.service';
import { CreateAlumnoCursaDto } from './dto/create-alumno-cursa.dto';
import { UpdateAlumnoCursaDto } from './dto/update-alumno-cursa.dto';

@Controller('alumno-cursa')
export class AlumnoCursaController {
  constructor(private readonly alumnoCursaService: AlumnoCursaService) {}

  @Post()
  create(@Body() createAlumnoCursaDto: CreateAlumnoCursaDto) {
    return this.alumnoCursaService.create(createAlumnoCursaDto);
  }

  @Get()
  findAll() {
    return this.alumnoCursaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoCursaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoCursaDto: UpdateAlumnoCursaDto) {
    return this.alumnoCursaService.update(+id, updateAlumnoCursaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoCursaService.remove(+id);
  }
}
