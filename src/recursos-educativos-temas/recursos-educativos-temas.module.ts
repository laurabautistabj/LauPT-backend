import {Module} from '@nestjs/common';
import {RecursosEducativosTemasService} from './recursos-educativos-temas.service';
import {RecursosEducativosTemasController} from './recursos-educativos-temas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecursosEducativosTema} from "./entities/recursos-educativos-tema.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RecursosEducativosTema])],
    controllers: [RecursosEducativosTemasController],
    providers: [RecursosEducativosTemasService],
    exports: [TypeOrmModule, RecursosEducativosTemasService]
})
export class RecursosEducativosTemasModule {
}
