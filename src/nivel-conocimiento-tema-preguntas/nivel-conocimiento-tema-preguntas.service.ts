import {Injectable} from '@nestjs/common';
import {CreateNivelConocimientoTemaPreguntaDto} from './dto/create-nivel-conocimiento-tema-pregunta.dto';
import {UpdateNivelConocimientoTemaPreguntaDto} from './dto/update-nivel-conocimiento-tema-pregunta.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {NivelConocimientoTemaPregunta} from "./entities/nivel-conocimiento-tema-pregunta.entity";
import {Repository} from "typeorm";

@Injectable()
export class NivelConocimientoTemaPreguntasService {

    constructor(@InjectRepository(NivelConocimientoTemaPregunta)
                private nivelConocimientoTemaPreguntaRepository: Repository<NivelConocimientoTemaPregunta>) {
    }

    async create(createNivelConocimientoTemaPreguntaDto: CreateNivelConocimientoTemaPreguntaDto) {
        const item = this.nivelConocimientoTemaPreguntaRepository.create(createNivelConocimientoTemaPreguntaDto);
        await this.nivelConocimientoTemaPreguntaRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all nivelConocimientoTemaPreguntas`;
    }

    findOne(id: number) {
        return `This action returns a #${id} nivelConocimientoTemaPregunta`;
    }

    update(id: number, updateNivelConocimientoTemaPreguntaDto: UpdateNivelConocimientoTemaPreguntaDto) {
        return `This action updates a #${id} nivelConocimientoTemaPregunta`;
    }

    remove(id: number) {
        return `This action removes a #${id} nivelConocimientoTemaPregunta`;
    }
}
