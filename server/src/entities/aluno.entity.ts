import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Plano } from './plano.entity';
import { AvaliacaoFisica } from './avaliacoes_fisica.entity';

@Entity({ schema: 'dbo', name: 'alunos' })
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: true })
  cpf: string;

  @Column({ type: 'date', nullable: true })
  data_nascimento: Date;

  @Column({ type: 'varchar', length: 1, nullable: true })
  genero: string;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  data_matricula: Date;

  @Column({ type: 'int', nullable: true })
  plano_id: number;

  @Column({ type: 'varchar', length: 10, default: 'ativo' })
  status: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at: Date;

  @ManyToOne(() => Plano, (plano) => plano.alunos)
  @JoinColumn({ name: 'plano_id' })
  plano: Plano;

  @OneToMany(() => AvaliacaoFisica, (avaliacao) => avaliacao.aluno)
  avaliacoes: AvaliacaoFisica[];
}
