import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Req} from '@nestjs/common';
import {TemaUnidadService} from './tema-unidad.service';
import {CreateTemaUnidadDto} from './dto/create-tema-unidad.dto';
import {UpdateTemaUnidadDto} from './dto/update-tema-unidad.dto';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {CreateNivelConocimientoTemaPreguntaDto} from "../nivel-conocimiento-tema-preguntas/dto/create-nivel-conocimiento-tema-pregunta.dto";
import {NivelConocimientoService} from "../nivel-conocimiento/nivel-conocimiento.service";
import {CreatePreguntasDto} from "../preguntas/dto/create-preguntas.dto";
import {PreguntasService} from "../preguntas/preguntas.service";
import {NivelConocimientoTemaPreguntasService} from "../nivel-conocimiento-tema-preguntas/nivel-conocimiento-tema-preguntas.service";
import {CreateRespuestasDto} from "../respuestas/dto/create-respuestas.dto";
import {RespuestasService} from "../respuestas/respuestas.service";
import {CustomRequest} from "../middlewares/firebase.middleware";
import {AlumnoService} from "../alumno/alumno.service";
import {CreateTemaUnidadRecursoDto} from "./dto/create-tema-unidad-recurso.dto";
import {EstiloAprendizajeService} from "../estilo-aprendizaje/estilo-aprendizaje.service";
import {RecursosEducativosService} from "../recursos-educativos/recursos-educativos.service";
import {CreateRecursosEducativoDto} from "../recursos-educativos/dto/create-recursos-educativo.dto";
import {RecursosEducativosTemasService} from "../recursos-educativos-temas/recursos-educativos-temas.service";
import {CreateRecursosEducativosTemaDto} from "../recursos-educativos-temas/dto/create-recursos-educativos-tema.dto";
import {CreateAlumnoCursaDto} from "../alumno-cursa/dto/create-alumno-cursa.dto";
import {AlumnoCursaService} from "../alumno-cursa/alumno-cursa.service";
import {CreateAlumnoCursaRespuestaDto} from "../alumno-cursa-respuesta/dto/create-alumno-cursa-respuesta.dto";
import {AlumnoCursaRespuestaService} from "../alumno-cursa-respuesta/alumno-cursa-respuesta.service";
import {Respuestas} from "../respuestas/entities/respuestas.entity";
import {fbCreateNotification} from "../util/firebase.util";

@Controller('tema-unidad')
export class TemaUnidadController {
    constructor(private readonly temaUnidadService: TemaUnidadService,
                private readonly nivelConocimientoService: NivelConocimientoService,
                private readonly preguntasService: PreguntasService,
                private readonly respuestasService: RespuestasService,
                private readonly alumnoService: AlumnoService,
                private readonly nivelConocimientoTemaPreguntasService: NivelConocimientoTemaPreguntasService,
                private readonly estiloAprendizajeService: EstiloAprendizajeService,
                private readonly recursosEducativosService: RecursosEducativosService,
                private readonly recursosEducativosTemasService: RecursosEducativosTemasService,
                private readonly alumnoCursaService: AlumnoCursaService,
                private readonly alumnoCursaRespuestaService: AlumnoCursaRespuestaService) {
    }

    @Post()
    create(@Body() createTemaUnidadDto: CreateTemaUnidadDto) {
        return this.temaUnidadService.create(createTemaUnidadDto);
    }

    @Get()
    findAll() {
        return this.temaUnidadService.findAll();
    }

    @Post(':id/preguntas')
    @Roles(AppRoles.PROFESSOR)
    async createQuestion(@Body() body: any,
                         @Param('id') id: string) {
        const questionSubject = new CreateNivelConocimientoTemaPreguntaDto();
        const knowledgeLevel = await this.nivelConocimientoService.findOne(body.knowledgeLevel);
        if (!knowledgeLevel) {
            throw new HttpException('Nivel de conocimiento no encontrado', 404);
        }
        questionSubject.NivelConocimiento = knowledgeLevel;

        const subject = await this.temaUnidadService.findOne(id);
        if (!subject) {
            throw new HttpException('Tema no encontrado', 404);
        }
        questionSubject.TemaUnidad = subject;

        const answers: { answer: string, isCorrect: boolean }[] = body.answers;
        if (answers.filter(u => u.isCorrect).length === 0) {
            throw new HttpException('Al menos una respuesta correcta', 404);
        }
        const multipleAnswers = answers.filter(u => u.isCorrect).length > 1;

        const preguntaDto = new CreatePreguntasDto();
        preguntaDto.Pregunta = body.question;
        preguntaDto.Multiple = multipleAnswers;
        preguntaDto.Imagen = body.imageURL ?? '';

        const pregunta = await this.preguntasService.create(preguntaDto);
        questionSubject.Pregunta = pregunta;
        for (let answer of answers) {
            const answerDto = new CreateRespuestasDto();
            answerDto.Pregunta = pregunta;
            answerDto.Respuesta = answer.answer;
            answerDto.Correcta = answer.isCorrect;
            await this.respuestasService.create(answerDto);
        }

        return await this.nivelConocimientoTemaPreguntasService.create(questionSubject);
    }

    @Get(':id/preguntas')
    @Roles(AppRoles.PROFESSOR, AppRoles.STUDENT)
    async listQuestions(@Param('id') id: string,
                        @Req() request: CustomRequest) {
        const user = request.user;
        const claims = user.customClaims;
        if (claims.isStudent) {
            return this.temaUnidadService.fetchQuestionnaireForStudent(id);
        } else {
            return this.temaUnidadService.fetchQuestionnaireForProfessor(id);
        }
    }

    @Delete(':id/preguntas')
    @Roles(AppRoles.PROFESSOR)
    async deleteQuestion(@Param('id') id: string,
                         @Req() request: CustomRequest) {
        return this.preguntasService.delete(id);
    }

    @Get(':id/questionnaire')
    @Roles(AppRoles.STUDENT)
    async initQuestionnaire(@Param('id') id: string,
                            @Req() request: CustomRequest) {
        const user = request.user;
        const student = await this.alumnoService.retrieveByFirebaseUid(user.uid);
        const unitSubject = await this.temaUnidadService.findOne(id);
        const lastSubjectQuestionnaire = await this.temaUnidadService.retrieveLastQuestionnaire(unitSubject.id, student.id);
        let alumnoCursaId = '';
        if (!lastSubjectQuestionnaire) {
            const alumnoCursaDto = new CreateAlumnoCursaDto();
            alumnoCursaDto.Alumno = student;
            alumnoCursaDto.TemaUnidad = unitSubject;
            alumnoCursaDto.NumIntentos = 1;
            alumnoCursaDto.TotalPreguntas = unitSubject.PreguntasPorCuestionario;
            alumnoCursaId = (await this.alumnoCursaService.create(alumnoCursaDto)).id;
        } else if (lastSubjectQuestionnaire.Finalizado) {
            const alumnoCursaDto = new CreateAlumnoCursaDto();
            alumnoCursaDto.Alumno = student;
            alumnoCursaDto.TemaUnidad = unitSubject;
            alumnoCursaDto.NumIntentos = lastSubjectQuestionnaire.NumIntentos + 1;
            alumnoCursaDto.TotalPreguntas = unitSubject.PreguntasPorCuestionario;
            alumnoCursaId = (await this.alumnoCursaService.create(alumnoCursaDto)).id;
        } else {
            alumnoCursaId = lastSubjectQuestionnaire.id;
        }
        const alumnoCursa = await this.alumnoCursaService.findOne(alumnoCursaId);
        let nextQuestion = await this.temaUnidadService.fetchNextQuestionOfStudentBySubject(alumnoCursa);
        if (!nextQuestion) {
            await this.alumnoCursaService.finish(alumnoCursa);
            nextQuestion = {
                TemaFinalizado: true
            };
            await fbCreateNotification(user.uid, 'Tema finalizado', `Has finalizado el tema: ${unitSubject.Nombre}`);
        }
        return Object.assign(nextQuestion, {AlumnoCursaId: alumnoCursaId});
    }

    @Post(':id/questionnaire')
    @Roles(AppRoles.STUDENT)
    async submitQuestionnaireAnswer(@Param('id') id: string,
                                    @Body() body: any,
                                    @Req() request: CustomRequest) {
        const user = request.user;
        const student = await this.alumnoService.retrieveByFirebaseUid(user.uid);
        const unitSubject = await this.temaUnidadService.findOne(id);
        const question = await this.preguntasService.findOne(body.IdPregunta);
        const alumnoCursa = await this.alumnoCursaService.findOne(body.AlumnoCursaId);
        if (!alumnoCursa || alumnoCursa.Finalizado) {
            throw new HttpException('Solicitud inválida', 400);
        }
        const idAnswersRaw = body.IdRespuesta.toString().split(',');
        const answers: Respuestas[] = [];
        for (let answer of idAnswersRaw) {
            const answerAux = await this.respuestasService.findOneRaw(answer);
            if (answerAux && answerAux.preguntaId !== body.IdPregunta) {
                throw new HttpException('Solicitud inválida', 400);
            }
            answers.push(answerAux);
        }
        for (let answer of answers) {
            const createAlumnoCursaRespuestaDto = new CreateAlumnoCursaRespuestaDto();
            createAlumnoCursaRespuestaDto.AlumnoCursa = alumnoCursa;
            createAlumnoCursaRespuestaDto.Preguntas = question;
            if (answer) {
                createAlumnoCursaRespuestaDto.Respuestas = answer;
                createAlumnoCursaRespuestaDto.Correcta = answer.Correcta;
            }
            await this.alumnoCursaRespuestaService.create(createAlumnoCursaRespuestaDto);
        }

        const allQuestionAnswers = await this.respuestasService.fetchAllAnswers(question.id);

        let addCorrect = 0;
        let addIncorrect = 0;
        let addSkipped = 0;

        const skipped = answers.filter(u => !u);
        if (skipped.length > 0) {
            addSkipped += 1;
        } else {
            const correctAnswers = answers.filter(u => u).filter(u => u.Correcta);
            const incorrectAnswers = answers.filter(u => u).filter(u => !u.Correcta);

            const partialCorrect = correctAnswers.length / allQuestionAnswers.filter(u => u.Correcta).length;
            const partialIncorrect = incorrectAnswers.length / allQuestionAnswers.filter(u => !u.Correcta).length;

            addCorrect += partialCorrect / (partialCorrect + partialIncorrect);

            addIncorrect += 1 - addCorrect;
        }

        await this.alumnoCursaService.setResult(alumnoCursa.id, alumnoCursa.Correctas + addCorrect, alumnoCursa.Incorrectas + addIncorrect, alumnoCursa.Omitidas + addSkipped);

        let nextQuestion = await this.temaUnidadService.fetchNextQuestionOfStudentBySubject(alumnoCursa);
        if (!nextQuestion) {
            await this.alumnoCursaService.finish(alumnoCursa);
            nextQuestion = {
                TemaFinalizado: true
            };
            await fbCreateNotification(user.uid, 'Tema finalizado', `Has finalizado el tema: ${unitSubject.Nombre}`);
        }
        return Object.assign(nextQuestion, {AlumnoCursaId: alumnoCursa.id}, {
            Resultado: {
                Correcta: addCorrect,
                Incorrecta: addIncorrect,
                Omitida: addSkipped
            }
        });
    }

    @Post(':id/notification')
    @Roles(AppRoles.STUDENT)
    async NotificationLevel(@Param('id') id: string,@Body() body: any, @Req() request: CustomRequest) {
        const user = request.user;
        const unitSubject = await this.temaUnidadService.findOne(id);
        await fbCreateNotification(user.uid, 'Nivel Alcanzado', `Alcanzaste el nivel ${body.nivel} en el tema ${unitSubject.Nombre}`);
        return {message:"ok"};
    }

    @Post(':id/notificationResource')
    @Roles(AppRoles.STUDENT)
    async NotificationLevelResource(@Param('id') id: string,@Body() body: any, @Req() request: CustomRequest) {
        const user = request.user;
        const unitSubject = await this.temaUnidadService.findOne(id);
        const lista = await this.temaUnidadService.listRecursosEsp(id,body.nivel2);
        await fbCreateNotification(user.uid, 'Recurso Recomendado', `Por alcanzar el nivel ${body.nivel} en 
        el tema ${unitSubject.Nombre} 
        y tu estilo de aprendizaje te recomendamos continuar con el siguiente
        recurso educativo. Nombre: ${lista[0].Nombre}, en el siguiente Link: ${lista[0].Url}`);
        console.log(user,lista);
        return {message:"ok"};
    }

    @Post(':id/recursos')
    @Roles(AppRoles.PROFESSOR)
    async createRecurso(@Param('id') id: string,
                        @Body() createTemaUnidadRecursoDto: CreateTemaUnidadRecursoDto) {
        const subject = await this.temaUnidadService.findOne(id);
        if (!subject) {
            throw new HttpException('Tema no encontrado', 404);
        }
        const knowledgeLevel = await this.nivelConocimientoService.findOne(createTemaUnidadRecursoDto.NivelConocimiento);
        if (!knowledgeLevel) {
            throw new HttpException('Nivel de conocimiento no encontrado', 404);
        }
        const learningStyle = await this.estiloAprendizajeService.findOne(createTemaUnidadRecursoDto.EstiloAprendizaje);
        if (!learningStyle) {
            throw new HttpException('Estilo de aprendizaje no encontrado', 404);
        }
        const educationalResourceDto = new CreateRecursosEducativoDto();
        educationalResourceDto.Nombre = createTemaUnidadRecursoDto.Nombre;
        educationalResourceDto.URL = createTemaUnidadRecursoDto.URL;
        const educationalResource = await this.recursosEducativosService.create(educationalResourceDto);
        const createRecursosEducativosTemaDto = new CreateRecursosEducativosTemaDto();
        createRecursosEducativosTemaDto.EstiloAprendizaje = learningStyle;
        createRecursosEducativosTemaDto.NivelConocimiento = knowledgeLevel;
        createRecursosEducativosTemaDto.TemaUnidad = subject;
        createRecursosEducativosTemaDto.RecursosEducativo = educationalResource;
        return this.recursosEducativosTemasService.create(createRecursosEducativosTemaDto);
    }

    @Get(':id/recursos')
    @Roles(AppRoles.PROFESSOR)
    async listRecursos(@Param('id') id: string) {
        return this.temaUnidadService.listRecursos(id);
    }

    @Delete(':id/recursos')
    @Roles(AppRoles.PROFESSOR)
    async deleteRecurso(@Param('id') id: string,
                        @Req() request: CustomRequest) {
        return this.recursosEducativosService.delete(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.temaUnidadService.findOne(id);
    }

    @Patch(':id')
    @Roles(AppRoles.PROFESSOR)
    update(@Param('id') id: string, @Body() createTemaUnidadDto: CreateTemaUnidadDto) {
        return this.temaUnidadService.update(id, createTemaUnidadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.temaUnidadService.remove(+id);
    }
}
