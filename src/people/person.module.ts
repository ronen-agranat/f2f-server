import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import PersonService from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PersonService],
})
export class PersonModule {}
