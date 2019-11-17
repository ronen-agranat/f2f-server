import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import Person from './interfaces/person.interface';
import PersonsService from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Post()
  createPerson(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Put(':id')
  updatePerson(@Param() params, @Body() updatePersonDto: UpdatePersonDto): Promise<Person> {
    return this.personService.update(Number(params.id), updatePersonDto);
  }

  @Get(':id')
  findOnePerson(@Param() params): Promise<Person> {
    return this.personService.find(Number(params.id));
  }

  @Get()
  findAllPersons(@Body() createPersonDto: CreatePersonDto): Promise<Person[]> {
    return this.personService.all();
  }
}
