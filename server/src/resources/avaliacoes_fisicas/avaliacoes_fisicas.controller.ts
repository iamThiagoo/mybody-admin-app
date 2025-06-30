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
import { AvaliacoesFisicasService } from './avaliacoes_fisicas.service';
import { CreateAvaliacoesFisicaDto } from './dto/create-avaliacoes_fisica.dto';
import { UpdateAvaliacoesFisicaDto } from './dto/update-avaliacoes_fisica.dto';
import { AvaliacaoFisica } from 'src/entities/avaliacoes_fisica.entity';

@Controller('avaliacoes-fisicas')
export class AvaliacoesFisicasController {
  constructor(private readonly service: AvaliacoesFisicasService) {}

  @Post()
  create(
    @Body() createAvaliacoesFisicaDto: CreateAvaliacoesFisicaDto,
  ): Promise<AvaliacaoFisica> {
    return this.service.create(createAvaliacoesFisicaDto);
  }

  @Get('/pagination')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string | undefined,
  ): Promise<{ data: AvaliacaoFisica[]; count: number }> {
    return this.service.pagination(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AvaliacaoFisica> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacoesFisicaDto: UpdateAvaliacoesFisicaDto,
  ): Promise<AvaliacaoFisica> {
    return this.service.update(id, updateAvaliacoesFisicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
