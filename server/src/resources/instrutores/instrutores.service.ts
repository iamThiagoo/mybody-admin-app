import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { UpdateInstrutorDto } from './dto/update-instrutor.dto';
import { ILike, Repository } from 'typeorm';
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
    search: string | undefined,
  ): Promise<{ data: Instrutor[]; count: number }> {
    const where = search
      ? [
          { nome: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { telefone: ILike(`%${search}%`) },
          { especialidade: ILike(`%${search}%`) },
        ]
      : undefined;

    const [data, count] = await this.repository.findAndCount({
      where,
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

    if (instrutor.avaliacoes && instrutor.avaliacoes.length > 0) {
      throw new InternalServerErrorException(
        `Instrutor possui avaliações cadastradas!`,
      );
    }

    await this.repository.remove(instrutor);
  }
}
