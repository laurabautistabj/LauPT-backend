import {Injectable} from '@nestjs/common';
import {CreateAlumnoCursaDto} from './dto/create-alumno-cursa.dto';
import {UpdateAlumnoCursaDto} from './dto/update-alumno-cursa.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {AlumnoCursa} from "./entities/alumno-cursa.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class AlumnoCursaService {

    constructor(@InjectRepository(AlumnoCursa)
                private alumnoCursaRepository: Repository<AlumnoCursa>) {
    }

    async create(createAlumnoCursaDto: CreateAlumnoCursaDto) {
        const item = this.alumnoCursaRepository.create(createAlumnoCursaDto);
        await this.alumnoCursaRepository.save(item);
        return item;
    }

    findAll() {
        return `This action returns all alumnoCursa`;
    }

    findOne(id: string) {
        return this.alumnoCursaRepository.findOne(id);
    }

    update(id: number, updateAlumnoCursaDto: UpdateAlumnoCursaDto) {
        return `This action updates a #${id} alumnoCursa`;
    }

    remove(id: number) {
        return `This action removes a #${id} alumnoCursa`;
    }

    async setResult(id: string, correct: number, incorrect: number, skipped: number) {
        const entityManager = getManager();
        const strQuery = 'UPDATE alumno_cursa set Correctas=?, Incorrectas=?, Omitidas=? WHERE id=?';
        return entityManager.query(strQuery, [correct, incorrect, skipped, id]);
    }

    async finish(alumnoCursa: AlumnoCursa) {
        alumnoCursa = await this.findOne(alumnoCursa.id);
        const score = (alumnoCursa.Correctas / alumnoCursa.TotalPreguntas) * 10;
        const entityManager = getManager();
        const strQuery = 'UPDATE alumno_cursa set Finalizado=?, Calificacion=?, Aprobado=?, FechaFinalizado=?  WHERE id=?';
        return entityManager.query(strQuery, [true, score, score >= 6, new Date(), alumnoCursa.id]);
    }
}
