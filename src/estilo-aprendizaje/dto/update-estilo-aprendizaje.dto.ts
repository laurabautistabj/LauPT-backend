import { PartialType } from '@nestjs/mapped-types';
import { CreateEstiloAprendizajeDto } from './create-estilo-aprendizaje.dto';

export class UpdateEstiloAprendizajeDto extends PartialType(CreateEstiloAprendizajeDto) {}
