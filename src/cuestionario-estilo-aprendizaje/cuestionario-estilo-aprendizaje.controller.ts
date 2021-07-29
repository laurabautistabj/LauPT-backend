import {Body, Controller, Get, Post} from '@nestjs/common';
import {CuestionarioEstiloAprendizajeService} from './cuestionario-estilo-aprendizaje.service';
import {Roles} from "../decorators/roles.decorator";
import {AppRoles} from "../guards/roles.guard";

@Controller('cuestionario-estilo-aprendizaje')
export class CuestionarioEstiloAprendizajeController {
    constructor(private readonly cuestionarioEstiloAprendizajeService: CuestionarioEstiloAprendizajeService) {
    }

    @Get()
    @Roles(AppRoles.ADMIN, AppRoles.PROFESSOR, AppRoles.STUDENT)
    async findAll() {
        return this.cuestionarioEstiloAprendizajeService.findAll();
    }
}
