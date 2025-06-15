import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateInstrutorDto {
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
  @Length(0, 100)
  especialidade?: string;

  @IsString()
  @IsOptional()
  @Length(0, 50)
  cref?: string;
}
