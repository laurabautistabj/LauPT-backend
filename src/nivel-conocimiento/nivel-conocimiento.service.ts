import {Injectable} from '@nestjs/common';
import {CreateNivelConocimientoDto} from './dto/create-nivel-conocimiento.dto';
import {UpdateNivelConocimientoDto} from './dto/update-nivel-conocimiento.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {NivelConocimiento} from "./entities/nivel-conocimiento.entity";
import {Repository} from "typeorm";

@Injectable()
export class NivelConocimientoService {

    constructor(@InjectRepository(NivelConocimiento)
                private nivelConocimientoRepository: Repository<NivelConocimiento>) {
    }

    async create(createNivelConocimientoDto: CreateNivelConocimientoDto) {
        const item = this.nivelConocimientoRepository.create(createNivelConocimientoDto);
        await this.nivelConocimientoRepository.save(item);
        return item;
    }

    findAll() {
        return this.nivelConocimientoRepository.find();
    }

    findOne(id: string) {
        return this.nivelConocimientoRepository.findOne(id);
    }

    update(id: number, updateNivelConocimientoDto: UpdateNivelConocimientoDto) {
        return `This action updates a #${id} nivelConocimiento`;
    }

    remove(id: number) {
        return `This action removes a #${id} nivelConocimiento`;
    }
}
