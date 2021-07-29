import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { UnidadAprendizajeService } from './unidad-aprendizaje.service';
import { CreateUnidadAprendizajeDto } from './dto/create-unidad-aprendizaje.dto';
import { UpdateUnidadAprendizajeDto } from './dto/update-unidad-aprendizaje.dto';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {CustomRequest} from "../middlewares/firebase.middleware";
import {ProfesorService} from "../profesor/profesor.service";
import {CreateCursoUnidadAprendizajeDto} from "./dto/create-curso-unidad-aprendizaje.dto";

@Controller('unidad-aprendizaje')
export class UnidadAprendizajeController {
  constructor(private readonly unidadAprendizajeService: UnidadAprendizajeService,
              private readonly profesorService: ProfesorService) {}

  @Post()
  @Roles(AppRoles.PROFESSOR)
  async create(@Body() createUnidadAprendizajeDto: CreateUnidadAprendizajeDto,
         @Req() request: CustomRequest) {
    const fbUser = request.user;
    const professorRaw = await this.profesorService.retrieveByFirebaseUid(fbUser.uid);
    const professor = await this.profesorService.findOne(professorRaw.id);
    createUnidadAprendizajeDto.Profesor = professorRaw;
    return this.unidadAprendizajeService.create(createUnidadAprendizajeDto);
  }

  @Get()
  @Roles(AppRoles.STUDENT, AppRoles.PROFESSOR)
  async findAll(@Req() request: CustomRequest) {
    const user = request.user;
    const claims = user.customClaims;
    if (claims.isStudent) {
      return this.unidadAprendizajeService.findAllActive();
    } else {
      const professorRaw = await this.profesorService.retrieveByFirebaseUid(user.uid);
      return this.unidadAprendizajeService.findByProfessor(professorRaw.id);
    }
  }

  @Post(':id/unidades')
  @Roles(AppRoles.PROFESSOR)
  async createUnidadCurso(@Body() createCursoUnidadAprendizajeDto: CreateCursoUnidadAprendizajeDto) {
    return {};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadAprendizajeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadAprendizajeDto: UpdateUnidadAprendizajeDto) {
    return this.unidadAprendizajeService.update(+id, updateUnidadAprendizajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadAprendizajeService.remove(+id);
  }
}
