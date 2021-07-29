import { PartialType } from '@nestjs/mapped-types';
import { CreateTemaUnidadDto } from './create-tema-unidad.dto';

export class UpdateTemaUnidadDto extends PartialType(CreateTemaUnidadDto) {}
