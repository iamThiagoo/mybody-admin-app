import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from 'src/entities/aluno.entity';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly service: AlunosService) {}

  @Post()
  create(@Body() CreateInstrutorDto: CreateAlunoDto): Promise<Aluno> {
    return this.service.create(CreateInstrutorDto);
  }

  @Get('/pagination')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string | undefined,
  ): Promise<{ data: Aluno[]; count: number }> {
    return this.service.pagination(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Aluno> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanoDto: UpdateAlunoDto,
  ): Promise<Aluno> {
    return this.service.update(id, updatePlanoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
