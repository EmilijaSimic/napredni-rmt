import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  //dwefe
  imports: [TypeOrmModule.forRoot({
      type: 'postgres'  ,
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'lozinka',
      database: 'napredni_rmt_baza',
      autoLoadEntities: true,
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
