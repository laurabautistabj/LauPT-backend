import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Preguntas} from "./entities/preguntas.entity";
import {getManager, Repository} from "typeorm";
import {CreatePreguntasDto} from "./dto/create-preguntas.dto";

@Injectable()
export class PreguntasService {

    constructor(@InjectRepository(Preguntas)
                private preguntasRepository: Repository<Preguntas>) {
    }

    async create(@Body() createPreguntasDto: CreatePreguntasDto) {
        const pregunta = this.preguntasRepository.create(createPreguntasDto);
        await this.preguntasRepository.save(pregunta);
        return pregunta;
    }

    async findOne(id: string) {
        return this.preguntasRepository.findOne(id);
    }

    async delete(id: string) {
        const entityManager = getManager();
        const queryStr = `
        UPDATE preguntas set Activo=? WHERE id=?
        `;
        return entityManager.query(queryStr, [false, id]);
    }
}
