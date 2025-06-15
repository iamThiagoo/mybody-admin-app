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
import { InstrutoresService } from './instrutores.service';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { Instrutor } from 'src/entities/instrutor.entity';

@Controller('instrutores')
export class InstrutoresController {
  constructor(private readonly service: InstrutoresService) {}

  @Post()
  create(@Body() CreateInstrutorDto: CreateInstrutorDto): Promise<Instrutor> {
    return this.service.create(CreateInstrutorDto);
  }

  @Get('/pagination')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Instrutor[]; count: number }> {
    return this.service.pagination(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Instrutor> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanoDto: UpdateInstrutorDto,
  ): Promise<Instrutor> {
    return this.service.update(id, updatePlanoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
