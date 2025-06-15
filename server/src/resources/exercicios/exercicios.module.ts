import { Module } from '@nestjs/common';
import { ExerciciosService } from './exercicios.service';
import { ExerciciosController } from './exercicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercicio } from 'src/entities/exercicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercicio])],
  controllers: [ExerciciosController],
  providers: [ExerciciosService],
  exports: [ExerciciosService],
})
export class ExerciciosModule {}
