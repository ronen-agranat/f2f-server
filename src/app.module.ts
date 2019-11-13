import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinutesController } from './minutes/minutes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PersonModule } from './people/person.module';

@Module({
  imports: [PersonModule, TypeOrmModule.forRoot()],
  controllers: [AppController, MinutesController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
