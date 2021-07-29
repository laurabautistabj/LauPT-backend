import {Injectable} from '@nestjs/common';
import {CreateRecursosEducativosTemaDto} from './dto/create-recursos-educativos-tema.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {RecursosEducativosTema} from "./entities/recursos-educativos-tema.entity";
import {Repository} from "typeorm";

@Injectable()
export class RecursosEducativosTemasService {

    constructor(@InjectRepository(RecursosEducativosTema)
                private recursosEducativosTemaRepository: Repository<RecursosEducativosTema>) {
    }

    async create(createRecursosEducativosTemaDto: CreateRecursosEducativosTemaDto) {
        const item = this.recursosEducativosTemaRepository.create(createRecursosEducativosTemaDto);
        await this.recursosEducativosTemaRepository.save(item);
        return item;
    }

    findOne(id: string) {
        return this.recursosEducativosTemaRepository.findOne(id);
    }
}
