import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Aluno } from './aluno.entity';
import { Instrutor } from './instrutor.entity';

@Entity({ schema: 'dbo', name: 'avaliacoes_fisicas' })
export class AvaliacaoFisica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  aluno_id: number;

  @Column({ type: 'int', nullable: false })
  instrutor_id: number;

  @Column({ type: 'date', default: () => 'GETDATE()', nullable: false })
  data_avaliacao: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  peso: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  altura: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  imc: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentual_gordura: number;

  @Column({ type: 'varchar', nullable: true })
  observacoes: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at: Date;

  @ManyToOne(() => Aluno, (aluno) => aluno.avaliacoes)
  @JoinColumn({ name: 'aluno_id' })
  aluno: Aluno;

  @ManyToOne(() => Instrutor, (instrutor) => instrutor.avaliacoes)
  @JoinColumn({ name: 'instrutor_id' })
  instrutor: Instrutor;
}
