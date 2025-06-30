import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Length,
  Min,
  IsNumber,
} from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  descricao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  preco: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  duracao_dias: number;
}
