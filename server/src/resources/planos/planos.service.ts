import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { Plano } from 'src/entities/plano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanosService {
  constructor(
    @InjectRepository(Plano)
    private readonly repository: Repository<Plano>,
  ) {}

  async create(createPlanoDto: CreatePlanoDto): Promise<Plano> {
    const plano = this.repository.create(createPlanoDto);
    return this.repository.save(plano);
  }

  async pagination(
    page = 1,
    limit = 10,
  ): Promise<{ data: Plano[]; count: number }> {
    const [data, count] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['alunos'],
      order: { id: 'DESC' },
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Plano> {
    const plano = await this.repository.findOne({
      where: { id },
      relations: ['alunos'],
    });

    if (!plano) throw new NotFoundException(`Plano não encontrado!`);

    return plano;
  }

  async update(id: number, updatePlanoDto: UpdatePlanoDto): Promise<Plano> {
    const plano = await this.findOne(id);
    Object.assign(plano, updatePlanoDto);
    return this.repository.save(plano);
  }

  async remove(id: number): Promise<void> {
    const plano = await this.findOne(id);
    await this.repository.remove(plano);
  }
}
