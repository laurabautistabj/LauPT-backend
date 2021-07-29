import {Injectable} from '@nestjs/common';
import {CreateUnidadCursoDto} from './dto/create-unidad-curso.dto';
import {UpdateUnidadCursoDto} from './dto/update-unidad-curso.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UnidadCurso} from "./entities/unidad-curso.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class UnidadCursoService {

    constructor(@InjectRepository(UnidadCurso)
                private unidadCursoRepository: Repository<UnidadCurso>) {
    }

    async create(createUnidadCursoDto: CreateUnidadCursoDto) {
        const item = this.unidadCursoRepository.create(createUnidadCursoDto);
        await this.unidadCursoRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all unidadCurso`;
    }

    findOne(id: string) {
        return this.unidadCursoRepository.findOne(id);
    }

    update(id: number, updateUnidadCursoDto: UpdateUnidadCursoDto) {
        return `This action updates a #${id} unidadCurso`;
    }

    remove(id: number) {
        return `This action removes a #${id} unidadCurso`;
    }

    async listByCourse(id: string) {
        const entityManager = getManager();
        const queryStr = `SELECT * FROM unidad_curso WHERE cursoId='${id}'`;
        return await entityManager.query(queryStr);
    }
}
