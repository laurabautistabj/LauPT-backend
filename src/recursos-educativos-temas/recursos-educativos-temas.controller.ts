import {Controller} from '@nestjs/common';
import {RecursosEducativosTemasService} from './recursos-educativos-temas.service';

@Controller('recursos-educativos-temas')
export class RecursosEducativosTemasController {
    constructor(private readonly recursosEducativosTemasService: RecursosEducativosTemasService) {
    }

}
