import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacoesFisicaDto } from './create-avaliacoes_fisica.dto';

export class UpdateAvaliacoesFisicaDto extends PartialType(
  CreateAvaliacoesFisicaDto,
) {}
