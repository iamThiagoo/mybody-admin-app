import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plano } from 'src/entities/plano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plano])],
  providers: [PlanosService],
  controllers: [PlanosController],
  exports: [PlanosService],
})
export class PlanosModule {}
