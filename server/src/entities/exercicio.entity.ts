import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'dbo', name: 'exercicios' })
export class Exercicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  grupo_muscular: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  equipamento: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nivel_dificuldade: string;

  @Column({ type: 'int', nullable: true })
  duracao_minutos: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
    onUpdate: 'GETDATE()',
  })
  updated_at: Date;
}
