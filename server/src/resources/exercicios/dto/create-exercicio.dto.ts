import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Length,
  Min,
} from 'class-validator';

export class CreateExercicioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  grupo_muscular?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  equipamento?: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  nivel_dificuldade?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  duracao_minutos?: number;
}
