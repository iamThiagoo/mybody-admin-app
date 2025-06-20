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
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { Plano } from 'src/entities/plano.entity';
import { PlanosService } from './planos.service';

@Controller('planos')
export class PlanosController {
  constructor(private readonly service: PlanosService) {}

  @Post()
  create(@Body() createPlanoDto: CreatePlanoDto): Promise<Plano> {
    return this.service.create(createPlanoDto);
  }

  @Get('/pagination')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search: string | undefined,
  ): Promise<{ data: Plano[]; count: number }> {
    return this.service.pagination(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Plano> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlanoDto: UpdatePlanoDto,
  ): Promise<Plano> {
    return this.service.update(id, updatePlanoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
