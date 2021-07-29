import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelConocimientoDto } from './create-nivel-conocimiento.dto';

export class UpdateNivelConocimientoDto extends PartialType(CreateNivelConocimientoDto) {}
