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
  aluno_id: number;

  @IsInt()
  @IsNotEmpty()
  instrutor_id: number;

  @IsDateString()
  @IsOptional()
  data_avaliacao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  peso?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  altura?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  imc?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  percentual_gordura?: number;

  @IsString()
  @IsOptional()
  observacoes?: string;
}
