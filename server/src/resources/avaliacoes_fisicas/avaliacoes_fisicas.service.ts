import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvaliacoesFisicaDto } from './dto/create-avaliacoes_fisica.dto';
import { UpdateAvaliacoesFisicaDto } from './dto/update-avaliacoes_fisica.dto';
import { AvaliacaoFisica } from 'src/entities/avaliacoes_fisica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AvaliacoesFisicasService {
  constructor(
    @InjectRepository(AvaliacaoFisica)
    private readonly repository: Repository<AvaliacaoFisica>,
  ) {}

  async create(
    createAvaliacoesFisicaDto: CreateAvaliacoesFisicaDto,
  ): Promise<AvaliacaoFisica> {
    const plano = this.repository.create(createAvaliacoesFisicaDto);
    return this.repository.save(plano);
  }

  async pagination(
    page = 1,
    limit = 10,
  ): Promise<{ data: AvaliacaoFisica[]; count: number }> {
    const [data, count] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['aluno', 'instrutor'],
    });

    return { data, count };
  }

  async findOne(id: number): Promise<AvaliacaoFisica> {
    const avaliacao = await this.repository.findOne({
      where: { id },
      relations: ['aluno', 'instrutor'],
    });

    if (!avaliacao) throw new NotFoundException(`Avaliação não encontrada!`);
    return avaliacao;
  }

  async update(
    id: number,
    updateAvaliacoesFisicaDto: UpdateAvaliacoesFisicaDto,
  ): Promise<AvaliacaoFisica> {
    const avaliacao = await this.findOne(id);
    Object.assign(avaliacao, updateAvaliacoesFisicaDto);
    return this.repository.save(avaliacao);
  }

  async remove(id: number): Promise<void> {
    const avaliacao = await this.repository.findOne({
      where: { id },
    });

    if (!avaliacao) throw new NotFoundException(`Avaliação não encontrada!`);
    await this.repository.remove(avaliacao);
  }
}
