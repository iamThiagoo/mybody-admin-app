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
import { ExerciciosService } from './exercicios.service';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';
import { Exercicio } from 'src/entities/exercicio.entity';

@Controller('exercicios')
export class ExerciciosController {
  constructor(private readonly service: ExerciciosService) {}

  @Post()
  create(@Body() createExercicioDto: CreateExercicioDto): Promise<Exercicio> {
    return this.service.create(createExercicioDto);
  }

  @Get('/pagination')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string | undefined,
  ): Promise<{ data: Exercicio[]; count: number }> {
    return this.service.pagination(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Exercicio> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExercicioDto: UpdateExercicioDto,
  ): Promise<Exercicio> {
    return this.service.update(id, updateExercicioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
