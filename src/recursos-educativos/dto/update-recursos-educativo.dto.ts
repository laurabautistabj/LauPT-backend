import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursosEducativoDto } from './create-recursos-educativo.dto';

export class UpdateRecursosEducativoDto extends PartialType(CreateRecursosEducativoDto) {}
