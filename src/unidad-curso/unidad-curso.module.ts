import {Module} from '@nestjs/common';
import {UnidadCursoService} from './unidad-curso.service';
import {UnidadCursoController} from './unidad-curso.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UnidadCurso} from "./entities/unidad-curso.entity";
import {TemaUnidadModule} from "../tema-unidad/tema-unidad.module";

@Module({
    imports: [TypeOrmModule.forFeature([UnidadCurso]), TemaUnidadModule],
    controllers: [UnidadCursoController],
    providers: [UnidadCursoService],
    exports: [TypeOrmModule, UnidadCursoService]
})
export class UnidadCursoModule {
}
