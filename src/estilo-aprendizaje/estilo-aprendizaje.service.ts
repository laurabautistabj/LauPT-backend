import {Injectable} from '@nestjs/common';
import {CreateEstiloAprendizajeDto} from './dto/create-estilo-aprendizaje.dto';
import {UpdateEstiloAprendizajeDto} from './dto/update-estilo-aprendizaje.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {EstiloAprendizaje} from "./entities/estilo-aprendizaje.entity";
import {Repository} from "typeorm";

@Injectable()
export class EstiloAprendizajeService {

    constructor(@InjectRepository(EstiloAprendizaje)
                private aprendizajeRepository: Repository<EstiloAprendizaje>) {
    }

    async create(createEstiloAprendizajeDto: CreateEstiloAprendizajeDto) {
        const estiloAprendizaje = this.aprendizajeRepository.create(createEstiloAprendizajeDto);
        await this.aprendizajeRepository.save(estiloAprendizaje);
        return estiloAprendizaje;
    }

    findAll() {
        return this.aprendizajeRepository.find();
    }

    findOne(id: string) {
        return this.aprendizajeRepository.findOne(id);
    }

    update(id: number, updateEstiloAprendizajeDto: UpdateEstiloAprendizajeDto) {
        return `This action updates a #${id} estiloAprendizaje`;
    }

    remove(id: number) {
        return `This action removes a #${id} estiloAprendizaje`;
    }
}
