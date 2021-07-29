import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {EstiloAprendizajeService} from './estilo-aprendizaje.service';
import {CreateEstiloAprendizajeDto} from './dto/create-estilo-aprendizaje.dto';
import {UpdateEstiloAprendizajeDto} from './dto/update-estilo-aprendizaje.dto';
import {CreatePreguntaEstiloAprendizajeDto} from "./dto/create-pregunta-estilo-aprendizaje.dto";
import {PreguntasService} from "../preguntas/preguntas.service";
import {CreatePreguntasDto} from "../preguntas/dto/create-preguntas.dto";
import {CreateRespuestasDto} from "../respuestas/dto/create-respuestas.dto";
import {RespuestasService} from "../respuestas/respuestas.service";
import {CuestionarioEstiloAprendizajeService} from "../cuestionario-estilo-aprendizaje/cuestionario-estilo-aprendizaje.service";
import {CreateCuestionarioEstiloAprendizajeDto} from "../cuestionario-estilo-aprendizaje/dto/create-cuestionario-estilo-aprendizaje.dto";
import {Roles} from "../decorators/roles.decorator";

@Controller('estilo-aprendizaje')
export class EstiloAprendizajeController {
    constructor(private readonly estiloAprendizajeService: EstiloAprendizajeService,
                private readonly preguntasService: PreguntasService,
                private readonly respuestasService: RespuestasService,
                private readonly cuestionarioEstiloAprendizajeService: CuestionarioEstiloAprendizajeService) {
    }

    @Post()
    create(@Body() createEstiloAprendizajeDto: CreateEstiloAprendizajeDto) {
        return this.estiloAprendizajeService.create(createEstiloAprendizajeDto);
    }

    @Post(':id/pregunta')
    @Roles('admin')
    async addQuestion(@Body() createPreguntaEstiloAprendizajeDto: CreatePreguntaEstiloAprendizajeDto,
                      @Param('id') id: string) {
        return 'Not Allowed';
        const estiloAprendizaje = await this.estiloAprendizajeService.findOne(id);
        if (!estiloAprendizaje) {
            throw {'message': 'Not Found'};
        }
        const preguntaDto = new CreatePreguntasDto();
        preguntaDto.Pregunta = createPreguntaEstiloAprendizajeDto.Pregunta;
        const pregunta = await this.preguntasService.create(preguntaDto);
        const yesAnswer = new CreateRespuestasDto();
        yesAnswer.Correcta = true;
        yesAnswer.Pregunta = pregunta;
        yesAnswer.Respuesta = 'Sí';
        await this.respuestasService.create(yesAnswer);
        const noAnswer = new CreateRespuestasDto();
        noAnswer.Correcta = false;
        noAnswer.Pregunta = pregunta;
        noAnswer.Respuesta = 'No';
        await this.respuestasService.create(noAnswer);

        const cuestionarioDto = new CreateCuestionarioEstiloAprendizajeDto();
        cuestionarioDto.EstiloAprendizaje = estiloAprendizaje;
        cuestionarioDto.Nombre = estiloAprendizaje.Nombre;
        cuestionarioDto.Preguntas = pregunta;
        return await this.cuestionarioEstiloAprendizajeService.create(cuestionarioDto);
    }

    @Get()
    findAll() {
        return this.estiloAprendizajeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.estiloAprendizajeService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEstiloAprendizajeDto: UpdateEstiloAprendizajeDto) {
        return this.estiloAprendizajeService.update(+id, updateEstiloAprendizajeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.estiloAprendizajeService.remove(+id);
    }
}
