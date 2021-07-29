import {Injectable} from '@nestjs/common';
import {CreateProfesorDto} from './dto/create-profesor.dto';
import {UpdateProfesorDto} from './dto/update-profesor.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Profesor} from "./entities/profesor.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class ProfesorService {

    constructor(@InjectRepository(Profesor)
                private profesorRepository: Repository<Profesor>) {
    }

    async create(createProfesorDto: CreateProfesorDto) {
        const profesor = this.profesorRepository.create();
        profesor.usuario = createProfesorDto.Usuario;
        await this.profesorRepository.save(profesor);
        return profesor;
    }

    findAll() {
        return `This action returns all profesor`;
    }

    findOne(id: string) {
        return this.profesorRepository.findOne(id);
    }

    update(id: number, updateProfesorDto: UpdateProfesorDto) {
        return `This action updates a #${id} profesor`;
    }

    remove(id: number) {
        return `This action removes a #${id} profesor`;
    }

    async retrieveByFirebaseUid(uid: string) {
        const entityManager = getManager();
        const queryStr = `SELECT * FROM profesor WHERE usuarioId IN (SELECT id FROM usuario WHERE IdFirebase='${uid}')`;
        const query = await entityManager.query(queryStr);
        return query.length === 0 ? null : query[0];
    }

    async retrieveProfessorDataByFirebaseUid(uid: string) {
        const entityManager = getManager();
        const queryStr = `
        select u.Nombre, u.ApPaterno, u.ApMaterno, u.Correo, u.Direccion, u.Sexo, u.Telefono, u.Foto from profesor p
        inner join usuario u on p.usuarioId = u.id
        where u.IdFirebase='${uid}'
        `;
        const query = await entityManager.query(queryStr);
        return query.length === 0 ? null : query[0];
    }
}
