import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Respuestas} from "./entities/respuestas.entity";
import {getManager, Repository} from "typeorm";
import {CreateRespuestasDto} from "./dto/create-respuestas.dto";

@Injectable()
export class RespuestasService {

    constructor(@InjectRepository(Respuestas)
                private respuestasRepository: Repository<Respuestas>) {
    }

    async create(@Body() createRespuestasDto: CreateRespuestasDto) {
        const respuesta = this.respuestasRepository.create(createRespuestasDto);
        await this.respuestasRepository.save(respuesta);
        return respuesta;
    }

    async findOne(id: string) {
        return this.respuestasRepository.findOne(id);
    }

    async fetchCorrectAnswers(id: string) {
        const entityManager = getManager();
        const queryStr = 'SELECT * FROM respuestas WHERE preguntaId=? AND Correcta=?';
        return await entityManager.query(queryStr, [id, true]);
    }

    async fetchAllAnswers(id: string) {
        const entityManager = getManager();
        const queryStr = 'SELECT * FROM respuestas WHERE preguntaId=?';
        return await entityManager.query(queryStr, [id]);
    }

    async findOneRaw(id: string) {
        const entityManager = getManager();
        const queryStr = 'SELECT * FROM respuestas WHERE id=?';
        const query = await entityManager.query(queryStr, [id]);
        return query.length > 0 ? query[0] : null;
    }
}
