import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursosEducativosTemaDto } from './create-recursos-educativos-tema.dto';

export class UpdateRecursosEducativosTemaDto extends PartialType(CreateRecursosEducativosTemaDto) {}
