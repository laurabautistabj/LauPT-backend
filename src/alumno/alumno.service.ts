import {Injectable} from '@nestjs/common';
import {CreateAlumnoDto} from './dto/create-alumno.dto';
import {UpdateAlumnoDto} from './dto/update-alumno.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Alumno} from "./entities/alumno.entity";
import {getManager, Repository} from "typeorm";

@Injectable()
export class AlumnoService {

    constructor(@InjectRepository(Alumno)
                private alumnoRepository: Repository<Alumno>) {
    }

    async create(createAlumnoDto: CreateAlumnoDto) {
        const alumno = this.alumnoRepository.create();
        alumno.usuario = createAlumnoDto.Usuario;
        await this.alumnoRepository.save(alumno);
        return alumno;
    }

    findAll() {
        return `This action returns all alumno`;
    }

    findOne(id: string) {
        return this.alumnoRepository.findOne(id);
    }

    update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
        return `This action updates a #${id} alumno`;
    }

    remove(id: number) {
        return `This action removes a #${id} alumno`;
    }

    async retrieveByFirebaseUid(uid: string) {
        const entityManager = getManager();
        const queryStr = `SELECT * FROM alumno WHERE usuarioId IN (SELECT id FROM usuario WHERE IdFirebase='${uid}')`;
        const query = await entityManager.query(queryStr);
        return query.length === 0 ? null : query[0];
    }

    async retrieveStudentDataByFirebaseUid(uid: string) {
        const entityManager = getManager();
        const queryStr = `
        select u.Nombre, u.ApPaterno, u.ApMaterno, u.Correo, u.Direccion, u.Sexo, u.Telefono, u.Foto from alumno a
        inner join usuario u on a.usuarioId = u.id
        where u.IdFirebase='${uid}'
        `;
        const query = await entityManager.query(queryStr);
        return query.length === 0 ? null : query[0];
    }
}
