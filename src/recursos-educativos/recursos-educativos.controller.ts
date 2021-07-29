import {Controller} from '@nestjs/common';
import {RecursosEducativosService} from './recursos-educativos.service';

@Controller('recursos-educativos')
export class RecursosEducativosController {
    constructor(private readonly recursosEducativosService: RecursosEducativosService) {
    }

}
