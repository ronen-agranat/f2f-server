import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import Person from './interfaces/person.interface';
import PersonsService from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('people')
export class PersonsController {
  people: Map<number, Person>;

  maxId: number;

  constructor(private readonly personService: PersonsService) {}

  @Post(':id')
  createPerson(@Param() params, @Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Get(':id')
  detailsForPerson(@Param() params): Promise<Person> {
    return this.personService.find(Number(params.id));
  }
}
