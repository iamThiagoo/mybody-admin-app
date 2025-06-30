import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAvaliacoesFisicaDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  aluno_id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  instrutor_id: number;

  @IsDateString()
  @IsOptional()
  data_avaliacao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  peso?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  altura?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  imc?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  percentual_gordura?: number;

  @IsString()
  @IsOptional()
  observacoes?: string;
}
