import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoCursaRespuestaDto } from './create-alumno-cursa-respuesta.dto';

export class UpdateAlumnoCursaRespuestaDto extends PartialType(CreateAlumnoCursaRespuestaDto) {}
