import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import Person from './interfaces/person.interface';
import PersonService from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreateMinutesDto } from '../minutes/create-minutes.dto';

@Controller('people')
export class PeopleController {
  people: Map<number, Person>;

  maxId: number;

  constructor(private readonly personService: PersonService) {}

  @Post(':id')
  createPerson(@Param() params, @Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Get(':id')
  detailsForPerson(@Param() params): Promise<Person> {
    return this.personService.find(Number(params.id));
  }
}
