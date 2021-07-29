import {Injectable} from '@nestjs/common';
import {CreateUnidadAprendizajeDto} from './dto/create-unidad-aprendizaje.dto';
import {UpdateUnidadAprendizajeDto} from './dto/update-unidad-aprendizaje.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UnidadAprendizaje} from "./entities/unidad-aprendizaje.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class UnidadAprendizajeService {

    constructor(@InjectRepository(UnidadAprendizaje)
                private unidadAprendizajeRepository: Repository<UnidadAprendizaje>) {
    }

    async create(createUnidadAprendizajeDto: CreateUnidadAprendizajeDto) {
        const item = this.unidadAprendizajeRepository.create(createUnidadAprendizajeDto);
        await this.unidadAprendizajeRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all unidadAprendizaje`;
    }

    findOne(id: number) {
        return `This action returns a #${id} unidadAprendizaje`;
    }

    update(id: number, updateUnidadAprendizajeDto: UpdateUnidadAprendizajeDto) {
        return `This action updates a #${id} unidadAprendizaje`;
    }

    remove(id: number) {
        return `This action removes a #${id} unidadAprendizaje`;
    }

    async findAllActive() {
        const entityManager = getManager();
        const queryStr = `SELECT * FROM unidad_aprendizaje WHERE Activa=1`;
        return await entityManager.query(queryStr);
    }

    async findByProfessor(professorId) {
        const entityManager = getManager();
        const queryStr = `SELECT * FROM unidad_aprendizaje WHERE profesorId='${professorId}'`;
        return await entityManager.query(queryStr);
    }
}
