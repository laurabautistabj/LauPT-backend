import { PartialType } from '@nestjs/mapped-types';
import { CreateEstiloAprendizajeAlumnoDto } from './create-estilo-aprendizaje-alumno.dto';

export class UpdateEstiloAprendizajeAlumnoDto extends PartialType(CreateEstiloAprendizajeAlumnoDto) {}
