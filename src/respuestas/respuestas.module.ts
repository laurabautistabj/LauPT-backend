import {Module} from '@nestjs/common';
import {RespuestasService} from './respuestas.service';
import {RespuestasController} from './respuestas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Respuestas} from "./entities/respuestas.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Respuestas])],
    controllers: [RespuestasController],
    providers: [RespuestasService],
    exports: [TypeOrmModule, RespuestasService]
})
export class RespuestasModule {
}
