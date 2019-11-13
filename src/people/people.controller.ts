import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import Person from './interfaces/person.interface';
import PersonService from './person.service';

@Controller('people')
export class PeopleController {
  people: Map<number, Person>;

  maxId: number;

  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  detailsForPerson(@Param() params): Person {
    return this.personService.find(Number(params.id));
  }
}
