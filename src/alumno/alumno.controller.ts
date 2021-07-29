import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException} from '@nestjs/common';
import {AlumnoService} from './alumno.service';
import {CreateAlumnoDto} from './dto/create-alumno.dto';
import {UpdateAlumnoDto} from './dto/update-alumno.dto';

import {CustomRequest} from "../middlewares/firebase.middleware";
import {UsuarioService} from "../usuario/usuario.service";
import {CreateUsuarioDto} from "../usuario/dto/create-usuario.dto";
import {fbCreateUserOnFirestore, fbSetStudentClaim} from "../util/firebase.util";
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {PartialUpdateAlumnoDto} from "./dto/partial-update-alumno.dto";
import {PartialUpdateUsuarioDto} from "../usuario/dto/partial-update-usuario.dto";

@Controller('alumno')
export class AlumnoController {
    constructor(private readonly alumnoService: AlumnoService,
                private readonly usuarioService: UsuarioService) {
    }

    @Post()
    async create(@Body() createAlumnoDto: CreateAlumnoDto,
                 @Req() request: CustomRequest) {
        const currentUser = request.user;
        const usuarioDto = new CreateUsuarioDto();
        usuarioDto.Nombre = createAlumnoDto.Nombre;
        usuarioDto.Foto = currentUser.photo_URL;
        usuarioDto.Correo = currentUser.email;
        usuarioDto.IdFirebase = currentUser.uid;
        usuarioDto.ApPaterno = createAlumnoDto.ApPaterno;
        usuarioDto.ApMaterno = createAlumnoDto.ApMaterno;
        usuarioDto.Direccion = createAlumnoDto.Direccion;
        usuarioDto.Sexo = createAlumnoDto.Sexo;
        usuarioDto.Telefono = createAlumnoDto.Telefono;
        createAlumnoDto.Usuario = await this.usuarioService.create(usuarioDto);
        await fbSetStudentClaim(currentUser.uid);
        await fbCreateUserOnFirestore(currentUser.uid, usuarioDto.Nombre);
        return this.alumnoService.create(createAlumnoDto);
    }

    @Post('/social')
    async createWithGoogle(@Req() request: CustomRequest) {
        const currentUser = request.user;
        if (!currentUser) {
            throw new HttpException('No user', 400);
        }
        if (currentUser.customClaims) {
            if (currentUser.customClaims.isProfessor) {
                return {};
            } else if (currentUser.customClaims.isStudent) {
                return {};
            } else if (currentUser.customClaims.isAdmin) {
                return {};
            }
        }
        const createAlumnoDto = new CreateAlumnoDto();
        createAlumnoDto.Nombre = currentUser.display_name;
        createAlumnoDto.ApPaterno = '';
        createAlumnoDto.ApMaterno = '';
        createAlumnoDto.Direccion = '';
        createAlumnoDto.Sexo = '';
        createAlumnoDto.Telefono = '';
        const usuarioDto = new CreateUsuarioDto();
        usuarioDto.Nombre = createAlumnoDto.Nombre;
        usuarioDto.Foto = currentUser.photo_URL;
        usuarioDto.Correo = currentUser.email;
        usuarioDto.IdFirebase = currentUser.uid;
        usuarioDto.ApPaterno = createAlumnoDto.ApPaterno;
        usuarioDto.ApMaterno = createAlumnoDto.ApMaterno;
        usuarioDto.Direccion = createAlumnoDto.Direccion;
        usuarioDto.Sexo = createAlumnoDto.Sexo;
        usuarioDto.Telefono = createAlumnoDto.Telefono;
        createAlumnoDto.Usuario = await this.usuarioService.create(usuarioDto);
        await fbSetStudentClaim(currentUser.uid);
        await fbCreateUserOnFirestore(currentUser.uid, usuarioDto.Nombre);
        return this.alumnoService.create(createAlumnoDto);
    }

    @Get()
    @Roles(AppRoles.ADMIN, AppRoles.PROFESSOR, AppRoles.STUDENT)
    findAll(@Req() request: CustomRequest) {
        const user = request.user;
        if (!user.customClaims) {
            throw new HttpException('Unauthorized', 401);
        }
        if (user.customClaims.isStudent) {
            return this.alumnoService.retrieveStudentDataByFirebaseUid(user.uid);
        } else {
            return this.alumnoService.findAll();
        }
    }

    @Patch()
    @Roles(AppRoles.STUDENT)
    async updateStudent(@Body() partialUpdateUsuarioDto: PartialUpdateUsuarioDto,
                        @Req() request: CustomRequest) {
        const user = request.user;
        const student = await this.alumnoService.retrieveByFirebaseUid(user.uid);
        await this.usuarioService.updateUsuario(student.usuarioId, partialUpdateUsuarioDto);
        return this.alumnoService.retrieveStudentDataByFirebaseUid(user.uid);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.alumnoService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
        return this.alumnoService.update(+id, updateAlumnoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.alumnoService.remove(+id);
    }
}
