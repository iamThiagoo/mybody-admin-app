import { Module } from '@nestjs/common';
import { AvaliacoesFisicasService } from './avaliacoes_fisicas.service';
import { AvaliacoesFisicasController } from './avaliacoes_fisicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoFisica } from 'src/entities/avaliacoes_fisica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvaliacaoFisica])],
  controllers: [AvaliacoesFisicasController],
  providers: [AvaliacoesFisicasService],
  exports: [AvaliacoesFisicasService],
})
export class AvaliacoesFisicasModule {}
