import {Injectable} from '@nestjs/common';
import {CreateRecursosEducativoDto} from './dto/create-recursos-educativo.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {RecursosEducativo} from "./entities/recursos-educativo.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class RecursosEducativosService {

    constructor(@InjectRepository(RecursosEducativo)
                private recursosEducativoRepository: Repository<RecursosEducativo>) {
    }

    async create(createRecursosEducativoDto: CreateRecursosEducativoDto) {
        const item = this.recursosEducativoRepository.create(createRecursosEducativoDto);
        await this.recursosEducativoRepository.save(item);
        return item;
    }

    findOne(id: string) {
        return this.recursosEducativoRepository.findOne(id);
    }

    async delete(id: string) {
        const entityManager = getManager();
        const queryStr = `
        UPDATE recursos_educativo set Activo=? WHERE id=?
        `;
        return entityManager.query(queryStr, [false, id]);
    }
}
