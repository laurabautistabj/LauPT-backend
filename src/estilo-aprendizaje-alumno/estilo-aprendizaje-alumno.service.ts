import {Injectable} from '@nestjs/common';
import {CreateEstiloAprendizajeAlumnoDto} from './dto/create-estilo-aprendizaje-alumno.dto';
import {UpdateEstiloAprendizajeAlumnoDto} from './dto/update-estilo-aprendizaje-alumno.dto';
import {getManager, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {EstiloAprendizajeAlumno} from "./entities/estilo-aprendizaje-alumno.entity";

@Injectable()
export class EstiloAprendizajeAlumnoService {

    constructor(@InjectRepository(EstiloAprendizajeAlumno)
    private estiloAprendizajeAlumnoRepository: Repository<EstiloAprendizajeAlumno>) {
    }

    async create(createEstiloAprendizajeAlumnoDto: CreateEstiloAprendizajeAlumnoDto) {
        const item = this.estiloAprendizajeAlumnoRepository.create(createEstiloAprendizajeAlumnoDto);
        await this.estiloAprendizajeAlumnoRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all estiloAprendizajeAlumno`;
    }

    findOne(id: string) {
        return this.estiloAprendizajeAlumnoRepository.findOne(id);
    }

    update(id: number, updateEstiloAprendizajeAlumnoDto: UpdateEstiloAprendizajeAlumnoDto) {
        return `This action updates a #${id} estiloAprendizajeAlumno`;
    }

    remove(id: number) {
        return `This action removes a #${id} estiloAprendizajeAlumno`;
    }

    async findAlumno(alumnoId: string) {
        const entityManager = getManager();
        const queryStr = `
        SELECT ea.Nombre FROM estilo_aprendizaje_alumno eaa
        inner join estilo_aprendizaje ea on eaa.estiloId = ea.id 
        WHERE eaa.alumnoId='${alumnoId}'
        `;
        const query = await entityManager.query(queryStr);
        return query.length === 0 ? null : query[0];
    }

    async evaluateAnswers(questionsId: string[], answersId: string[]) {
        const entityManager = getManager();
        const queryStr = `select ea.id, sum(r.Correcta) as count from respuestas as r
                            inner join preguntas p on r.preguntaId = p.id
                            inner join cuestionario_estilo_aprendizaje cea on p.id = cea.preguntasId
                            inner join estilo_aprendizaje ea on cea.estiloAprendizajeId = ea.id
                            WHERE p.id IN (${questionsId.map(u => `'${u}'`).join(',')}) AND
                            r.id IN (${answersId.map(u => `'${u}'`).join(',')}) group by ea.id`;
        const query = await entityManager.query(queryStr);
        query.sort((a, b) => b.count - a.count);
        return query[0].id;
    }
}
