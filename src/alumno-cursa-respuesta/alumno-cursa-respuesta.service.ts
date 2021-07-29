import {Injectable} from '@nestjs/common';
import {CreateAlumnoCursaRespuestaDto} from './dto/create-alumno-cursa-respuesta.dto';
import {UpdateAlumnoCursaRespuestaDto} from './dto/update-alumno-cursa-respuesta.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {AlumnoCursaRespuesta} from "./entities/alumno-cursa-respuesta.entity";
import {Repository} from "typeorm";

@Injectable()
export class AlumnoCursaRespuestaService {

    constructor(@InjectRepository(AlumnoCursaRespuesta)
                private alumnoCursaRespuestaRepository: Repository<AlumnoCursaRespuesta>) {
    }

    async create(createAlumnoCursaRespuestaDto: CreateAlumnoCursaRespuestaDto) {
        const item = this.alumnoCursaRespuestaRepository.create(createAlumnoCursaRespuestaDto);
        await this.alumnoCursaRespuestaRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all alumnoCursaRespuesta`;
    }

    findOne(id: number) {
        return `This action returns a #${id} alumnoCursaRespuesta`;
    }

    update(id: number, updateAlumnoCursaRespuestaDto: UpdateAlumnoCursaRespuestaDto) {
        return `This action updates a #${id} alumnoCursaRespuesta`;
    }

    remove(id: number) {
        return `This action removes a #${id} alumnoCursaRespuesta`;
    }
}
