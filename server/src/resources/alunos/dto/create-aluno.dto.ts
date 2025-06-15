import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEmail,
  Length,
  IsInt,
  IsIn,
} from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsEmail()
  @IsOptional()
  @Length(0, 100)
  email?: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  telefone?: string;

  @IsString()
  @IsOptional()
  @Length(11, 14)
  cpf?: string;

  @IsDateString()
  @IsOptional()
  data_nascimento?: string;

  @IsString()
  @IsOptional()
  @Length(1, 1)
  @IsIn(['M', 'F'])
  genero?: string;

  @IsDateString()
  @IsOptional()
  data_matricula?: string;

  @IsInt()
  @IsOptional()
  plano_id?: number;

  @IsString()
  @IsOptional()
  @Length(1, 10)
  status?: string;
}
