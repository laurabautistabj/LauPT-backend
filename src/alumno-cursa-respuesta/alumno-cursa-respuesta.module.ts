import {Module} from '@nestjs/common';
import {AlumnoCursaRespuestaService} from './alumno-cursa-respuesta.service';
import {AlumnoCursaRespuestaController} from './alumno-cursa-respuesta.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlumnoCursaRespuesta} from "./entities/alumno-cursa-respuesta.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AlumnoCursaRespuesta])],
    controllers: [AlumnoCursaRespuestaController],
    providers: [AlumnoCursaRespuestaService],
    exports: [TypeOrmModule, AlumnoCursaRespuestaService]
})
export class AlumnoCursaRespuestaModule {
}
