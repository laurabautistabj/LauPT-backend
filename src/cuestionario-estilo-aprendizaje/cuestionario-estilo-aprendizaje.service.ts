import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CuestionarioEstiloAprendizaje} from "./entities/cuestionario-estilo-aprendizaje.entity";
import {getManager, Repository} from "typeorm";
import {CreateCuestionarioEstiloAprendizajeDto} from "./dto/create-cuestionario-estilo-aprendizaje.dto";

@Injectable()
export class CuestionarioEstiloAprendizajeService {

    constructor(@InjectRepository(CuestionarioEstiloAprendizaje)
                private cuestionarioEstiloAprendizajeRepository: Repository<CuestionarioEstiloAprendizaje>) {
    }

    async create(@Body() createCuestionarioEstiloAprendizajeDto: CreateCuestionarioEstiloAprendizajeDto) {
        const cuestionario = this.cuestionarioEstiloAprendizajeRepository.create(createCuestionarioEstiloAprendizajeDto);
        await this.cuestionarioEstiloAprendizajeRepository.save(cuestionario);
        return cuestionario;
    }

    async findAll() {
        const entityManager = getManager();
        const queryStr = 'SELECT p.id as IdPregunta, p.Pregunta, p.Multiple, r.id as IdRespuesta, r.Respuesta FROM preguntas as p\n' +
            'INNER JOIN respuestas r on p.id = r.preguntaId\n' +
            'WHERE p.id IN (SELECT preguntasId FROM cuestionario_estilo_aprendizaje)';
        const query = await entityManager.query(queryStr);

        const questionnaireObj = query.reduce((r, a) => {
            r[a.IdPregunta] = r[a.IdPregunta] || {Pregunta: a.Pregunta, Multiple: a.Multiple, Respuestas: []};
            r[a.IdPregunta].Respuestas.push({Id: a.IdRespuesta, Respuesta: a.Respuesta});
            return r;
        }, Object.create(null));

        return Object.keys(questionnaireObj).map(u => ({Id: u, ...questionnaireObj[u]}));
    }
}
