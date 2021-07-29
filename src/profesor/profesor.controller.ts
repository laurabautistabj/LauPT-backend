import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException} from '@nestjs/common';
import {ProfesorService} from './profesor.service';
import {CreateProfesorDto} from './dto/create-profesor.dto';
import {UpdateProfesorDto} from './dto/update-profesor.dto';
import {CreateUsuarioDto} from "../usuario/dto/create-usuario.dto";
import {fbCreateUser, fbSetProfessorClaim, fbSetStudentClaim} from "../util/firebase.util";
import {UsuarioService} from "../usuario/usuario.service";
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";
import {CustomRequest} from "../middlewares/firebase.middleware";
import {PartialUpdateUsuarioDto} from "../usuario/dto/partial-update-usuario.dto";

@Controller('profesor')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService,
                private readonly usuarioService: UsuarioService) {
    }

    @Post()
    async create(@Body() createProfesorDto: CreateProfesorDto) {
        try {
            const currentUser = await fbCreateUser(createProfesorDto.Nombre, createProfesorDto.Correo, createProfesorDto.Password);
            const usuarioDto = new CreateUsuarioDto();
            usuarioDto.Nombre = createProfesorDto.Nombre;
            usuarioDto.Foto = currentUser.photoURL;
            usuarioDto.Correo = currentUser.email;
            usuarioDto.IdFirebase = currentUser.uid;
            usuarioDto.ApPaterno = createProfesorDto.ApPaterno;
            usuarioDto.ApMaterno = createProfesorDto.ApMaterno;
            usuarioDto.Direccion = createProfesorDto.Direccion;
            usuarioDto.Sexo = createProfesorDto.Sexo;
            usuarioDto.Telefono = createProfesorDto.Telefono;
            createProfesorDto.Usuario = await this.usuarioService.create(usuarioDto);
            await fbSetProfessorClaim(currentUser.uid);
            return this.profesorService.create(createProfesorDto);
        } catch (error) {
            console.log(error);
            throw {message: error.toString()};
        }
    }

    @Get()
    @Roles(AppRoles.ADMIN, AppRoles.PROFESSOR)
    findAll(@Req() request: CustomRequest) {
        const user = request.user;
        if (!user.customClaims) {
            throw new HttpException('Unauthorized', 401);
        }
        if (user.customClaims.isProfessor) {
            return this.profesorService.retrieveProfessorDataByFirebaseUid(user.uid);
        } else {
            return this.profesorService.findAll();
        }
    }

    @Patch()
    @Roles(AppRoles.PROFESSOR)
    async updateProfessor(@Body() partialUpdateUsuarioDto: PartialUpdateUsuarioDto,
                        @Req() request: CustomRequest) {
        const user = request.user;
        const student = await this.profesorService.retrieveByFirebaseUid(user.uid);
        await this.usuarioService.updateUsuario(student.usuarioId, partialUpdateUsuarioDto);
        return this.profesorService.retrieveProfessorDataByFirebaseUid(user.uid);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profesorService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfesorDto: UpdateProfesorDto) {
        return this.profesorService.update(+id, updateProfesorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profesorService.remove(+id);
    }
}
