import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException} from '@nestjs/common';
import {CursosService} from './cursos.service';
import {CreateCursoDto} from './dto/create-curso.dto';
import {UpdateCursoDto} from './dto/update-curso.dto';
import {ProfesorService} from "../profesor/profesor.service";
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {CustomRequest} from "../middlewares/firebase.middleware";
import {CreateUnidadCursoDto} from "../unidad-curso/dto/create-unidad-curso.dto";
import {UnidadCursoService} from "../unidad-curso/unidad-curso.service";
import {AlumnoService} from "../alumno/alumno.service";
import {fbCreateCourseOnFirestore} from "../util/firebase.util";

@Controller('cursos')
export class CursosController {
    constructor(private readonly cursosService: CursosService,
                private readonly profesorService: ProfesorService,
                private readonly alumnoService: AlumnoService,
                private readonly unidadCursoService: UnidadCursoService) {
    }

    @Post()
    @Roles(AppRoles.PROFESSOR)
    async create(@Body() createCursoDto: CreateCursoDto,
                 @Req() request: CustomRequest) {
        const fbUser = request.user;
        createCursoDto.Profesor = await this.profesorService.retrieveByFirebaseUid(fbUser.uid);
        const course = await this.cursosService.create(createCursoDto);
        await fbCreateCourseOnFirestore(course.id, course.Nombre);
        return course;
    }

    @Get()
    @Roles(AppRoles.STUDENT, AppRoles.PROFESSOR)
    async findAll(@Req() request: CustomRequest) {
        const user = request.user;
        const claims = user.customClaims;
        if (claims.isStudent) {
            return this.cursosService.findAllActive();
        } else {
            const professorRaw = await this.profesorService.retrieveByFirebaseUid(user.uid);
            return this.cursosService.findByProfessor(professorRaw.id);
        }
    }

    @Post(':id/unidades')
    @Roles(AppRoles.PROFESSOR)
    async createUnidad(@Body() createUnidadCursoDto: CreateUnidadCursoDto,
                       @Param('id') id: string) {
        const curso = await this.cursosService.findOne(id);
        if (!curso) {
            throw new HttpException('Curso no encontrado', 404);
        }
        createUnidadCursoDto.Curso = curso;
        return this.unidadCursoService.create(createUnidadCursoDto);
    }

    @Get(':id/unidades')
    @Roles(AppRoles.PROFESSOR, AppRoles.STUDENT)
    async listUnidad(@Param('id') id: string) {
        const curso = await this.cursosService.findOne(id);
        if (!curso) {
            throw new HttpException('Curso no encontrado', 404);
        }
        return this.unidadCursoService.listByCourse(id);
    }

    @Get(':id/content')
    @Roles(AppRoles.STUDENT)
    async courseContent(@Param('id') id: string,
                        @Req() request: CustomRequest) {
        const user = request.user;
        const student = await this.alumnoService.retrieveByFirebaseUid(user.uid);
        return this.cursosService.getContent(id, student.id);
    }

    @Get(':id')
    @Roles(AppRoles.PROFESSOR, AppRoles.STUDENT)
    findOne(@Param('id') id: string) {
        return this.cursosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
        return this.cursosService.update(+id, updateCursoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cursosService.remove(+id);
    }

    @Get(':id/alumnos')
    @Roles(AppRoles.PROFESSOR)
    async listStudents(@Param('id') id: string) {
        const curso = await this.cursosService.findOne(id);
        if (!curso) {
            throw new HttpException('Curso no encontrado', 404);
        }
        return this.cursosService.getStudents(id);
    }
}
