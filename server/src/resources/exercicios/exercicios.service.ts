import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';
import { Exercicio } from 'src/entities/exercicio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciciosService {
  constructor(
    @InjectRepository(Exercicio)
    private readonly repository: Repository<Exercicio>,
  ) {}

  async create(createExercicioDto: CreateExercicioDto): Promise<Exercicio> {
    const plano = this.repository.create(createExercicioDto);
    return this.repository.save(plano);
  }

  async pagination(
    page = 1,
    limit = 10,
  ): Promise<{ data: Exercicio[]; count: number }> {
    const [data, count] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Exercicio> {
    const exercicio = await this.repository.findOne({
      where: { id },
    });

    if (!exercicio) throw new NotFoundException(`Exercicio não encontrado!`);

    return exercicio;
  }

  async update(
    id: number,
    updateExercicioDto: UpdateExercicioDto,
  ): Promise<Exercicio> {
    const exercicio = await this.findOne(id);
    Object.assign(exercicio, updateExercicioDto);
    return this.repository.save(exercicio);
  }

  async remove(id: number): Promise<void> {
    const exercicio = await this.repository.findOne({
      where: { id },
    });

    if (!exercicio) throw new NotFoundException(`Exercício não encontrado!`);
    await this.repository.remove(exercicio);
  }
}
