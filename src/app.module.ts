import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinutesController } from './minutes/minutes.controller';
import { PeopleController } from './people/people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import PersonService from './people/person.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController, MinutesController, PeopleController],
  providers: [AppService, PersonService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
