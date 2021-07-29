import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadCursoDto } from './create-unidad-curso.dto';

export class UpdateUnidadCursoDto extends PartialType(CreateUnidadCursoDto) {}
