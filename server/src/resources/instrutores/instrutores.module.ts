import { Module } from '@nestjs/common';
import { InstrutoresService } from './instrutores.service';
import { InstrutoresController } from './instrutores.controller';
import { Instrutor } from 'src/entities/instrutor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Instrutor])],
  controllers: [InstrutoresController],
  providers: [InstrutoresService],
  exports: [InstrutoresService],
})
export class InstrutoresModule {}
