import {Module} from '@nestjs/common';
import {RecursosEducativosService} from './recursos-educativos.service';
import {RecursosEducativosController} from './recursos-educativos.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecursosEducativo} from "./entities/recursos-educativo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RecursosEducativo])],
    controllers: [RecursosEducativosController],
    providers: [RecursosEducativosService],
    exports: [TypeOrmModule, RecursosEducativosService]
})
export class RecursosEducativosModule {
}
