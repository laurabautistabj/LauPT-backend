import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException} from '@nestjs/common';
import {UnidadCursoService} from './unidad-curso.service';
import {CreateUnidadCursoDto} from './dto/create-unidad-curso.dto';
import {UpdateUnidadCursoDto} from './dto/update-unidad-curso.dto';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {TemaUnidadService} from "../tema-unidad/tema-unidad.service";
import {CreateTemaUnidadDto} from "../tema-unidad/dto/create-tema-unidad.dto";

@Controller('unidad-curso')
export class UnidadCursoController {
    constructor(private readonly unidadCursoService: UnidadCursoService,
                private readonly temaUnidadService: TemaUnidadService) {
    }

    @Post()
    create(@Body() createUnidadCursoDto: CreateUnidadCursoDto) {
        return this.unidadCursoService.create(createUnidadCursoDto);
    }

    @Get()
    findAll() {
        return this.unidadCursoService.findAll();
    }

    @Get(':id/temas')
    @Roles(AppRoles.PROFESSOR, AppRoles.STUDENT)
    async listTemas(@Param('id') id: string) {
        const unidad = await this.unidadCursoService.findOne(id);
        if (!unidad) {
            throw new HttpException('Unidad no encontrada', 404);
        }
        return this.temaUnidadService.listByUnit(id);
    }

    @Post(':id/temas')
    @Roles(AppRoles.PROFESSOR)
    async createTema(@Body() createTemaUnidadDto: CreateTemaUnidadDto,
                     @Param('id') id: string) {
        const unidad = await this.unidadCursoService.findOne(id);
        if (!unidad) {
            throw new HttpException('Unidad no encontrada', 404);
        }
        createTemaUnidadDto.UnidadCurso = unidad;
        return this.temaUnidadService.create(createTemaUnidadDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.unidadCursoService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUnidadCursoDto: UpdateUnidadCursoDto) {
        return this.unidadCursoService.update(+id, updateUnidadCursoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.unidadCursoService.remove(+id);
    }
}
