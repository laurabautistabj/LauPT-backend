import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus} from '@nestjs/common';
import {EstiloAprendizajeAlumnoService} from './estilo-aprendizaje-alumno.service';
import {CreateEstiloAprendizajeAlumnoDto} from './dto/create-estilo-aprendizaje-alumno.dto';
import {UpdateEstiloAprendizajeAlumnoDto} from './dto/update-estilo-aprendizaje-alumno.dto';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {CustomRequest} from "../middlewares/firebase.middleware";
import {AlumnoService} from "../alumno/alumno.service";
import {EstiloAprendizajeService} from "../estilo-aprendizaje/estilo-aprendizaje.service";
import {fbCreateNotification} from "../util/firebase.util";

@Controller('estilo-aprendizaje-alumno')
export class EstiloAprendizajeAlumnoController {
    constructor(private readonly estiloAprendizajeAlumnoService: EstiloAprendizajeAlumnoService,
                private readonly aprendizajeService: EstiloAprendizajeService,
                private readonly alumnoService: AlumnoService) {
    }

    @Post()
    @Roles(AppRoles.STUDENT)
    async create(@Body() answers: { Pregunta: string, Respuesta: string }[],
                 @Req() request: CustomRequest) {
        const fbUser = request.user;
        const alumnoRaw = await this.alumnoService.retrieveByFirebaseUid(fbUser.uid);

        const hasLearningStyle = await this.estiloAprendizajeAlumnoService.findAlumno(alumnoRaw.id);
        if (!!hasLearningStyle) {
            throw new HttpException('Estilo de aprendizaje ya asignado', HttpStatus.BAD_REQUEST);
        }

        const alumno = await this.alumnoService.findOne(alumnoRaw.id);
        const estiloAprendizajeId = await this.estiloAprendizajeAlumnoService.evaluateAnswers(answers.map(u => u.Pregunta), answers.map(u => u.Respuesta));
        const estiloAprendizaje = await this.aprendizajeService.findOne(estiloAprendizajeId);
        const createEstiloAprendizajeAlumnoDto = new CreateEstiloAprendizajeAlumnoDto();
        createEstiloAprendizajeAlumnoDto.Alumno = alumno;
        createEstiloAprendizajeAlumnoDto.Estilo = estiloAprendizaje;

        await fbCreateNotification(
            fbUser.uid,
            'Estilo de aprendizaje asignado',
            `Se te ha asignado el estilo de aprendizaje ${estiloAprendizaje.Nombre}`
        )
        return await this.estiloAprendizajeAlumnoService.create(createEstiloAprendizajeAlumnoDto);
    }

    @Get()
    @Roles(AppRoles.STUDENT)
    async findAll(@Req() request: CustomRequest) {
        const fbUser = request.user;
        const alumnoRaw = await this.alumnoService.retrieveByFirebaseUid(fbUser.uid);
        const estiloAprendizaje = await this.estiloAprendizajeAlumnoService.findAlumno(alumnoRaw.id);
        if (!estiloAprendizaje) {
            throw new HttpException('Alumno no ha realizado la prueba', HttpStatus.BAD_REQUEST);
        } else {
            return estiloAprendizaje;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.estiloAprendizajeAlumnoService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEstiloAprendizajeAlumnoDto: UpdateEstiloAprendizajeAlumnoDto) {
        return this.estiloAprendizajeAlumnoService.update(+id, updateEstiloAprendizajeAlumnoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.estiloAprendizajeAlumnoService.remove(+id);
    }
}
