import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosModule } from './resources/alunos/alunos.module';
import { PlanosModule } from './resources/planos/planos.module';
import { AvaliacoesFisicasModule } from './resources/avaliacoes_fisicas/avaliacoes_fisicas.module';
import { InstrutoresModule } from './resources/instrutores/instrutores.module';
import { ExerciciosModule } from './resources/exercicios/exercicios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      extra: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }),
    AlunosModule,
    PlanosModule,
    AvaliacoesFisicasModule,
    InstrutoresModule,
    ExerciciosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
