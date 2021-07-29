import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadAprendizajeDto } from './create-unidad-aprendizaje.dto';

export class UpdateUnidadAprendizajeDto extends PartialType(CreateUnidadAprendizajeDto) {}
