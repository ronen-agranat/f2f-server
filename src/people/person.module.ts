import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import PersonService from './person.service';

@Module({
  controllers: [PeopleController],
  providers: [PersonService],
})
export class PersonModule {}
