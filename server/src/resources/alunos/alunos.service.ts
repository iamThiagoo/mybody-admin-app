import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from 'src/entities/aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private readonly repository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.repository.create(createAlunoDto);
    return this.repository.save(aluno);
  }

  async pagination(
    page = 1,
    limit = 10,
    search: string | undefined,
  ): Promise<{ data: Aluno[]; count: number }> {
    const where = search
      ? [
          { nome: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
          { telefone: ILike(`%${search}%`) },
          { cpf: ILike(`%${search}%`) },
        ]
      : undefined;

    const [data, count] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['plano', 'avaliacoes'],
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.repository.findOne({
      where: { id },
      relations: ['plano', 'avaliacoes'],
    });

    if (!aluno) throw new NotFoundException(`Aluno não encontrado!`);

    return aluno;
  }

  async update(id: number, UpdateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(id);
    Object.assign(aluno, UpdateAlunoDto);
    return this.repository.save(aluno);
  }

  async remove(id: number): Promise<void> {
    const aluno = await this.repository.findOne({
      where: { id },
      relations: ['plano', 'avaliacoes'],
    });

    if (!aluno) throw new NotFoundException(`Aluno não encontrado!`);

    if (aluno.avaliacoes && aluno.avaliacoes.length > 0) {
      throw new InternalServerErrorException(
        `Não é possível remover o aluno pois ele possui avaliações cadastradas!`,
      );
    }

    if (aluno.plano && Object.keys(aluno.plano).length > 0) {
      throw new InternalServerErrorException(
        `Não é possível remover o aluno pois ele possui um plano cadastrado!`,
      );
    }

    await this.repository.remove(aluno);
  }
}
