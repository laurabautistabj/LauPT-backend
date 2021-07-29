import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoCursaDto } from './create-alumno-cursa.dto';

export class UpdateAlumnoCursaDto extends PartialType(CreateAlumnoCursaDto) {}
