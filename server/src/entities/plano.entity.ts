import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Aluno } from './aluno.entity';

@Entity({ schema: 'dbo', name: 'planos' })
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column({ type: 'int', nullable: false })
  duracao_dias: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at: Date;

  @OneToMany(() => Aluno, (aluno) => aluno.plano)
  alunos: Aluno[];
}
