import {Module} from '@nestjs/common';
import {CursosService} from './cursos.service';
import {CursosController} from './cursos.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Curso} from "./entities/curso.entity";
import {ProfesorModule} from "../profesor/profesor.module";
import {UnidadCursoModule} from "../unidad-curso/unidad-curso.module";
import {AlumnoModule} from "../alumno/alumno.module";

@Module({
    imports: [TypeOrmModule.forFeature([Curso]), ProfesorModule, UnidadCursoModule, AlumnoModule],
    controllers: [CursosController],
    providers: [CursosService]
})
export class CursosModule {
}
