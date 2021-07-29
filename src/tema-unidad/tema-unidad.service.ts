import {Injectable} from '@nestjs/common';
import {CreateTemaUnidadDto} from './dto/create-tema-unidad.dto';
import {UpdateTemaUnidadDto} from './dto/update-tema-unidad.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TemaUnidad} from "./entities/tema-unidad.entity";
import {getManager, Repository} from "typeorm";
import {Alumno} from "../alumno/entities/alumno.entity";
import {CreateAlumnoCursaDto} from "../alumno-cursa/dto/create-alumno-cursa.dto";
import {AlumnoCursa} from "../alumno-cursa/entities/alumno-cursa.entity";

@Injectable()
export class TemaUnidadService {

    constructor(@InjectRepository(TemaUnidad)
                private temaUnidadRepository: Repository<TemaUnidad>) {
    }

    async create(createTemaUnidadDto: CreateTemaUnidadDto) {
        const item = this.temaUnidadRepository.create(createTemaUnidadDto);
        await this.temaUnidadRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all temaUnidad`;
    }

    findOne(id: string) {
        return this.temaUnidadRepository.findOne(id);
    }

    update(id: string, createTemaUnidadDto: CreateTemaUnidadDto) {
        const entityManager = getManager();
        const queryStr = `UPDATE tema_unidad
                          SET Nombre=?,
                              Descripcion=?,
                              Indice=?,
                              PreguntasPorCuestionario=?,
                              TiempoVolverIntentar=?
                          WHERE id = ?`;
        return entityManager.query(queryStr, [createTemaUnidadDto.Nombre, createTemaUnidadDto.Descripcion, createTemaUnidadDto.Indice, createTemaUnidadDto.PreguntasPorCuestionario, createTemaUnidadDto.TiempoVolverIntentar, id]);
    }

    remove(id: number) {
        return `This action removes a #${id} temaUnidad`;
    }

    async listByUnit(id: string) {
        const entityManager = getManager();
        const queryStr = `SELECT *
                          FROM tema_unidad
                          WHERE unidadCursoId = '${id}'`;
        return await entityManager.query(queryStr);
    }

    async fetchQuestionnaireForProfessor(id: string) {
        const entityManager = getManager();
        const queryStr = `
            select nc.Nombre,
                   p.id as IdPregunta,
                   p.Pregunta,
                   p.Multiple,
                   p.Imagen,
                   r.id as IdRespuesta,
                   r.Respuesta,
                   r.Correcta
            from nivel_conocimiento_tema_pregunta nctp
                     inner join preguntas p on nctp.preguntaId = p.id
                     inner join respuestas r on p.id = r.preguntaId
                     inner join nivel_conocimiento nc on nctp.nivelConocimientoId = nc.id
            where nctp.temaUnidadId = '${id}'
              AND p.Activo = 1
        `;
        const query = await entityManager.query(queryStr);

        const questionnaireObj = query.reduce((r, a) => {
            r[a.IdPregunta] = r[a.IdPregunta] || {
                Pregunta: a.Pregunta,
                Multiple: a.Multiple,
                Imagen: a.Imagen,
                Respuestas: [],
                Nivel: a.Nombre
            };
            r[a.IdPregunta].Respuestas.push({Id: a.IdRespuesta, Respuesta: a.Respuesta, Correcta: a.Correcta});
            return r;
        }, Object.create(null));

        return Object.keys(questionnaireObj).map(u => ({Id: u, ...questionnaireObj[u]}));
    }

    async notifyResource(body: any) {
        const entityManager = getManager();
        const queryStr = `
            select re.Nombre, re.URL
            from  
            
            
            nc.Nombre, p.id as IdPregunta, p.Pregunta, p.Multiple, r.id as IdRespuesta, r.Respuesta
            from nivel_conocimiento_tema_pregunta nctp
                     inner join preguntas p on nctp.preguntaId = p.id
                     inner join respuestas r on p.id = r.preguntaId
                     inner join nivel_conocimiento nc on nctp.nivelConocimientoId = nc.id
            where nctp.temaUnidadId = '${body}'
              AND p.Activo = 1
        `;
        const query = await entityManager.query(queryStr);

        const questionnaireObj = query.reduce((r, a) => {
            r[a.IdPregunta] = r[a.IdPregunta] || {
                Pregunta: a.Pregunta,
                Multiple: a.Multiple,
                Respuestas: [],
                Nivel: a.Nombre
            };
            r[a.IdPregunta].Respuestas.push({Id: a.IdRespuesta, Respuesta: a.Respuesta});
            return r;
        }, Object.create(null));

        return Object.keys(questionnaireObj).map(u => ({Id: u, ...questionnaireObj[u]}));
    }

    async fetchQuestionnaireForStudent(id: string) {
        const entityManager = getManager();
        const queryStr = `
            select nc.Nombre, p.id as IdPregunta, p.Pregunta, p.Multiple, r.id as IdRespuesta, r.Respuesta
            from nivel_conocimiento_tema_pregunta nctp
                     inner join preguntas p on nctp.preguntaId = p.id
                     inner join respuestas r on p.id = r.preguntaId
                     inner join nivel_conocimiento nc on nctp.nivelConocimientoId = nc.id
            where nctp.temaUnidadId = '${id}'
              AND p.Activo = 1
        `;
        const query = await entityManager.query(queryStr);

        const questionnaireObj = query.reduce((r, a) => {
            r[a.IdPregunta] = r[a.IdPregunta] || {
                Pregunta: a.Pregunta,
                Multiple: a.Multiple,
                Respuestas: [],
                Nivel: a.Nombre
            };
            r[a.IdPregunta].Respuestas.push({Id: a.IdRespuesta, Respuesta: a.Respuesta});
            return r;
        }, Object.create(null));

        return Object.keys(questionnaireObj).map(u => ({Id: u, ...questionnaireObj[u]}));
    }

    async retrieveLastQuestionnaire(subjectId: string, studentId: string) {
        const entityManager = getManager();
        let queryStr = 'SELECT ac.NumIntentos, ac.Finalizado, ac.id FROM alumno_cursa ac ' +
            'INNER JOIN tema_unidad tu ' +
            'INNER JOIN unidad_curso uc ' +
            'WHERE tu.unidadCursoId=uc.id AND ' +
            'ac.temaUnidadId=tu.id AND ' +
            'ac.temaUnidadId=? AND ' +
            'ac.alumnoId=? ' +
            'ORDER BY ac.NumIntentos DESC LIMIT 1';
        let query = await entityManager.query(queryStr, [subjectId, studentId]);
        return query.length > 0 ? query[0] : null;
    }

    async getQuestionnaireOfQuestionId(subjectId: string, studentId: string, questionId: string, alumnoCursaId: string) {
        const entityManager = getManager();
        let queryStr = `
            select ac.id
            from alumno_cursa ac
                     inner join tema_unidad tu on ac.temaUnidadId = tu.id
                     inner join nivel_conocimiento_tema_pregunta nctp on tu.id = nctp.temaUnidadId
                     inner join preguntas p on nctp.preguntaId = p.id
            where p.id = ?
              and p.id not in (
                select p2.id
                from alumno_cursa_respuesta acr
                         inner join respuestas r on acr.respuestasId = r.id
                         inner join preguntas p2 on r.preguntaId = p2.id
                         inner join alumno_cursa ac2 on acr.alumnoCursaId = ac2.id
                where p2.id = ?
                  and ac2.id = ?
            )
              and ac.alumnoId = ?
              and ac.temaUnidadId = ?
              and ac.Finalizado = ?
              and ac.id = ?
            order by ac.NumIntentos desc limit 1
        `;
        const query = await entityManager.query(queryStr, [questionId, questionId, alumnoCursaId, studentId, subjectId, false, alumnoCursaId]);
        return query.length > 0 ? query[0] : null;
    }

    async fetchNextQuestionOfStudentBySubject(alumnoCursa: AlumnoCursa) {
        const entityManager = getManager();
        let queryStr = '';
        let query;

        // Verifica si ya llegó al límite de preguntas
        queryStr = `
            select distinct preguntasId from alumno_cursa_respuesta where alumnoCursaId=?;
        `;
        query = await entityManager.query(queryStr, [alumnoCursa.id]);
        if (query.length >= alumnoCursa.TotalPreguntas) {
            return null; // Regresa nulo para indicar que ya no hay más preguntas para este cuestionario
        }

        // Verifica si ya llegó al límite de preguntas

        // Selecciona la siguiente pregunta

        queryStr = `
            select p.id
            from alumno_cursa ac
                     inner join tema_unidad tu on ac.temaUnidadId = tu.id
                     inner join nivel_conocimiento_tema_pregunta nctp on tu.id = nctp.temaUnidadId
                     inner join preguntas p on nctp.preguntaId = p.id
            where ac.id = ?
              and p.Activo = 1
              and p.id not in (
                select p2.id
                from alumno_cursa ac2
                         inner join alumno_cursa_respuesta acr on ac2.id = acr.alumnoCursaId
                         inner join preguntas p2 on acr.preguntasId = p2.id
                where ac2.id = ?
            )
            order by RAND() limit 1
        `;
        query = await entityManager.query(queryStr, [alumnoCursa.id, alumnoCursa.id]);
        if (query.length === 0) {
            return null; //Retorna nulo si no hay una siguiente pregunta para este cuestionario
        }
        query = query[0];

        // Selecciona la siguiente pregunta


        // Obtiene las respuestas a la pregunta obtenida a través del Id de la pregunta

        queryStr = `
            select p.id as IdPregunta,
                   p.Pregunta,
                   p.Multiple,
                   p.Imagen,
                   r.id as IdRespuesta, 
                   r.Respuesta,
                   nctp.nivelConocimientoId,
                   nc.Nombre
            from preguntas p
                     inner join respuestas r on p.id = r.preguntaId
                     inner join nivel_conocimiento_tema_pregunta nctp on nctp.preguntaId = p.id
                     inner join nivel_conocimiento nc on nc.id = nctp.nivelConocimientoId
            where p.id = '${query.id}'
        `
        query = await entityManager.query(queryStr);
        const questionObj = query.reduce((r, a) => {
            r[a.IdPregunta] = r[a.IdPregunta] || {
                Pregunta: a.Pregunta,
                Multiple: a.Multiple,
                Respuestas: [],
                Imagen: a.Imagen,
                nivelConocimientoId: a.nivelConocimientoId,
                ncNombre: a.Nombre
            };
            r[a.IdPregunta].Respuestas.push({Id: a.IdRespuesta, Respuesta: a.Respuesta});
            return r;
        }, Object.create(null));

        // Obtiene las respuestas a la pregunta obtenida

        return Object.keys(questionObj).map(u => ({Id: u, ...questionObj[u]}))[0];
    }

    async listRecursos(subjectId: string) {
        const entityManager = getManager();
        let queryStr = `
            select re.id,
                   re.Nombre as Nombre,
                   re.URL    as Url,
                   ea.Nombre as EstiloAprendizaje,
                   nc.Nombre as NivelConocimiento
            from recursos_educativos_tema ret
                     inner join recursos_educativo re on ret.recursosEducativoId = re.id
                     inner join estilo_aprendizaje ea on ret.estiloAprendizajeId = ea.id
                     inner join nivel_conocimiento nc on ret.nivelConocimientoId = nc.id
            where ret.temaUnidadId = '${subjectId}'
              AND re.Activo = 1
        `;
        return entityManager.query(queryStr);
    }

    async listRecursosEsp(subjectId: string, nivel:string) {
        const entityManager = getManager();
        let queryStr = `
            select re.id,
                   re.Nombre as Nombre,
                   re.URL    as Url,
                   ea.Nombre as EstiloAprendizaje,
                   nc.Nombre as NivelConocimiento
            from recursos_educativos_tema ret
                     inner join recursos_educativo re on ret.recursosEducativoId = re.id
                     inner join estilo_aprendizaje ea on ret.estiloAprendizajeId = ea.id
                     inner join nivel_conocimiento nc on ret.nivelConocimientoId = nc.id
            where ret.temaUnidadId = '${subjectId}' AND nc.Nombre = '${nivel}'
              AND re.Activo = 1
              ORDER BY RAND()
                LIMIT 1;
        `;
        return entityManager.query(queryStr);
    }
}
