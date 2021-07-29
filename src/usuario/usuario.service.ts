import {Body, Injectable} from '@nestjs/common';
import {CreateUsuarioDto} from './dto/create-usuario.dto';
import {UpdateUsuarioDto} from './dto/update-usuario.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./entities/usuario.entity";
import {getManager, Repository} from "typeorm";
import {PartialUpdateUsuarioDto} from "./dto/partial-update-usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario)
                private usuarioRepository: Repository<Usuario>) {
    }

    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        const user = this.usuarioRepository.create(createUsuarioDto);
        await this.usuarioRepository.save(user);
        return user;
    }

    findAll() {
        return this.usuarioRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} usuario`;
    }

    update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
        return `This action updates a #${id} usuario`;
    }

    remove(id: number) {
        return `This action removes a #${id} usuario`;
    }

    async updateUsuario(id: string, partialUpdateUsuarioDto: PartialUpdateUsuarioDto) {
        const entityManager = getManager();
        const queryStr = `
        UPDATE usuario
        SET Nombre='${partialUpdateUsuarioDto.Nombre}', ApPaterno='${partialUpdateUsuarioDto.ApPaterno}', ApMaterno='${partialUpdateUsuarioDto.ApMaterno}', Direccion='${partialUpdateUsuarioDto.Direccion}', Foto='${partialUpdateUsuarioDto.Foto}', Sexo='${partialUpdateUsuarioDto.Sexo}', Telefono='${partialUpdateUsuarioDto.Telefono}' 
        WHERE id='${id}'
        `;
        return await entityManager.query(queryStr);
    }
}
