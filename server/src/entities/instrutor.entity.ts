import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AvaliacaoFisica } from './avaliacoes_fisica.entity';

@Entity({ schema: 'dbo', name: 'instrutores' })
export class Instrutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  especialidade: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cref: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at: Date;

  @OneToMany(() => AvaliacaoFisica, (avaliacao) => avaliacao.instrutor)
  avaliacoes: AvaliacaoFisica[];
}
