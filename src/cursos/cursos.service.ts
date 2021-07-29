import {Injectable} from '@nestjs/common';
import {CreateCursoDto} from './dto/create-curso.dto';
import {UpdateCursoDto} from './dto/update-curso.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Curso} from "./entities/curso.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class CursosService {

    constructor(@InjectRepository(Curso)
                private cursoRepository: Repository<Curso>) {
    }

    async create(createCursoDto: CreateCursoDto) {
        const item = this.cursoRepository.create(createCursoDto);
        await this.cursoRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all cursos`;
    }

    findOne(id: string) {
        return this.cursoRepository.findOne(id);
    }

    update(id: number, updateCursoDto: UpdateCursoDto) {
        return `This action updates a #${id} curso`;
    }

    remove(id: number) {
        return `This action removes a #${id} curso`;
    }

    async findAllActive() {
        const entityManager = getManager();
        const queryStr = `SELECT *
                          FROM curso
                          WHERE Activa = 1`;
        return await entityManager.query(queryStr);
    }

    async findByProfessor(professorId) {
        const entityManager = getManager();
        const queryStr = `SELECT *
                          FROM curso
                          WHERE profesorId = '${professorId}'`;
        return await entityManager.query(queryStr);
    }

    async getContent(id: string, studentId: string) {
        const entityManager = getManager();
        const queryStr = `
            select c.id                    as Id,
                   c.Nombre                as Nombre,
                   c.Descripcion           as Descripcion,
                   uc.id                   as IdUnidad,
                   uc.Nombre               as NombreUnidad,
                   uc.Indice               as IndiceUnidad,
                   tu.id                   as IdTema,
                   tu.Nombre               as NombreTema,
                   tu.Indice               as IndiceTema,
                   tu.TiempoVolverIntentar as TiempoVolverIntentar
            from curso c
                     inner join unidad_curso uc on c.id = uc.cursoId
                     inner join tema_unidad tu on uc.id = tu.unidadCursoId
            where c.id = '${id}'
            order by uc.Indice, tu.Indice
        `;
        const rawData = await entityManager.query(queryStr);
        const subjectIds = rawData.map(u => u.IdTema);
        let auxQueryStr = 'select * from alumno_cursa where temaUnidadId IN (?) AND alumnoId=? order by NumIntentos DESC ';
        const auxQuery = await entityManager.query(auxQueryStr, [subjectIds, studentId]);

        const courseObj = rawData.reduce((r, a) => {
            const {Id, Descripcion, Nombre, ...remainingData} = a;
            r[Id] = r[Id] || {Id: Id, Descripcion: Descripcion, Nombre: Nombre, Unidades: []};
            r[Id].Unidades.push(remainingData);
            return r;
        }, Object.create(null));
        const courseArray = Object.keys(courseObj).map(u => courseObj[u]);
        const courseData = courseArray.length > 0 ? courseArray[0] : null;
        const unitsRaw = courseData.Unidades;

        const unitsObj = unitsRaw.reduce((r, a) => {
            const {IdUnidad, NombreUnidad, IndiceUnidad, ...remainingData} = a;
            r[IdUnidad] = r[IdUnidad] || {Id: IdUnidad, Nombre: NombreUnidad, Indice: IndiceUnidad, Temas: []};
            const alumnoCursa = auxQuery.filter(u => u.temaUnidadId === remainingData.IdTema);
            r[IdUnidad].Temas.push({
                Id: remainingData.IdTema,
                Nombre: remainingData.NombreTema,
                Indice: remainingData.IndiceTema,
                TiempoVolverIntentar: remainingData.TiempoVolverIntentar,
                AlumnoCursa: alumnoCursa,
                Finalizado: !!alumnoCursa.find(u => u.Finalizado),
                Aprobado: !!alumnoCursa.find(u => u.Aprobado),
                Activo: false
            });
            return r;
        }, Object.create(null));
        courseData.Unidades = Object.keys(unitsObj).map(u => unitsObj[u]);
        return courseData;
    }

    async getStudents(id: string) {
        const entityManager = getManager();
        const queryStr = `
            select a.id,
                   u.Nombre,
                   u.ApPaterno,
                   u.ApMaterno,
                   u.Foto,
                   u.Telefono,
                   u.Sexo,
                   u.Correo,
                   ea.Nombre as EstiloAprendizaje,
                   tu.id     as TemaId,
                   tu.Nombre as Tema,
                   uc.id     as UnidadId,
                   uc.Nombre as Unidad,
                   c.Nombre  as Curso,
                   ac.NumIntentos,
                   ac.Finalizado,
                   ac.Correctas,
                   ac.Incorrectas,
                   ac.Omitidas,
                   ac.Creado,
                   ac.Actualizado
            from alumno_cursa ac
                     inner join tema_unidad tu on ac.temaUnidadId = tu.id
                     inner join unidad_curso uc on tu.unidadCursoId = uc.id
                     inner join curso c on uc.cursoId = c.id
                     inner join alumno a on ac.alumnoId = a.id
                     inner join usuario u on a.usuarioId = u.id
                     inner join estilo_aprendizaje_alumno eaa on a.id = eaa.alumnoId
                     inner join estilo_aprendizaje ea on eaa.estiloId = ea.id
            where c.id = ?
            order by u.ApPaterno, u.ApMaterno, a.id, uc.Indice, tu.Indice, ac.NumIntentos
        `;
        const query = await entityManager.query(queryStr, [id]);

        const studentsObj = query.reduce((r, a) => {
            const {
                id,
                Nombre,
                ApPaterno,
                ApMaterno,
                Foto,
                Telefono,
                Sexo,
                Correo,
                EstiloAprendizaje,
                ...remainingData
            } = a;
            r[id] = r[id] || {
                id,
                Nombre,
                ApPaterno,
                ApMaterno,
                Foto,
                Telefono,
                Sexo,
                Correo,
                EstiloAprendizaje,
                Unidades: []
            };
            r[id].Unidades.push(remainingData);
            return r;
        }, Object.create(null));
        const studentsArray = Object.keys(studentsObj).map(u => studentsObj[u]);
        studentsArray.forEach(u => {
            const unitObj = u.Unidades.reduce((r, a) => {
                const {UnidadId, Unidad, ...remainingData} = a;
                r[UnidadId] = r[UnidadId] || {id: UnidadId, Nombre: Unidad, Temas: []};
                r[UnidadId].Temas.push(remainingData);
                return r;
            }, Object.create(null));
            const unitArray = Object.keys(unitObj).map(v => unitObj[v]);

            unitArray.forEach(v => {
                const subjectObj = v.Temas.reduce((r, a) => {
                    const {TemaId, Tema, ...remainingData} = a;
                    r[TemaId] = r[TemaId] || {id: TemaId, Nombre: Tema, Cuestionarios: []};
                    r[TemaId].Cuestionarios.push(remainingData);
                    return r;
                }, Object.create(null));
                v.Temas = Object.keys(subjectObj).map(w => subjectObj[w]);
            });
            u.Unidades = unitArray;
        });
        return studentsArray;
    }
}
