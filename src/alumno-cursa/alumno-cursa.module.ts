import {Module} from '@nestjs/common';
import {AlumnoCursaService} from './alumno-cursa.service';
import {AlumnoCursaController} from './alumno-cursa.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlumnoCursa} from "./entities/alumno-cursa.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AlumnoCursa])],
    controllers: [AlumnoCursaController],
    providers: [AlumnoCursaService],
    exports: [TypeOrmModule, AlumnoCursaService]
})
export class AlumnoCursaModule {
}
