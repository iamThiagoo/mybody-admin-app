import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { Repository } from 'typeorm';
import { Instrutor } from 'src/entities/instrutor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstrutoresService {
  constructor(
    @InjectRepository(Instrutor)
    private readonly repository: Repository<Instrutor>,
  ) {}

  async create(createInstrutoreDto: CreateInstrutorDto): Promise<Instrutor> {
    const plano = this.repository.create(createInstrutoreDto);
    return this.repository.save(plano);
  }

  async pagination(
    page = 1,
    limit = 10,
  ): Promise<{ data: Instrutor[]; count: number }> {
    const [data, count] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Instrutor> {
    const instrutor = await this.repository.findOne({
      where: { id },
      relations: ['avaliacoes'],
    });

    if (!instrutor) throw new NotFoundException(`Instrutor não encontrado!`);

    return instrutor;
  }

  async update(
    id: number,
    updatePlanoDto: UpdateInstrutorDto,
  ): Promise<Instrutor> {
    const instrutor = await this.findOne(id);
    Object.assign(instrutor, updatePlanoDto);
    return this.repository.save(instrutor);
  }

  async remove(id: number): Promise<void> {
    const instrutor = await this.repository.findOne({
      where: { id },
      relations: ['avaliacoes'],
    });

    if (!instrutor) throw new NotFoundException(`Instrutor não encontrado!`);

    if (instrutor.avaliacoes) {
      throw new InternalServerErrorException(
        `Instrutor possui avaliações cadastradas!`,
      );
    }

    await this.repository.remove(instrutor);
  }
}
