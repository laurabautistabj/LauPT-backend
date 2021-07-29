import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelConocimientoTemaPreguntaDto } from './create-nivel-conocimiento-tema-pregunta.dto';

export class UpdateNivelConocimientoTemaPreguntaDto extends PartialType(CreateNivelConocimientoTemaPreguntaDto) {}
