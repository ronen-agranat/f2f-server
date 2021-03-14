import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DeleteResult } from 'typeorm';

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
  async findOnePerson(@Param() params): Promise<Person> {
    const id = Number(params.id);
    const person = await this.personService.find(id);
    if (!person) {
      throw new HttpException(`No person with id ${id}`, HttpStatus.NOT_FOUND);
    }
    return person;
  }

  @Get()
  findAllPersons(@Body() createPersonDto: CreatePersonDto): Promise<Person[]> {
    return this.personService.all();
  }

  @Delete(':id')
  removePerson(@Param() params): Promise<DeleteResult> {
    // TODO: Don't leak data-store implementation via API
    return this.personService.remove(Number(params.id));
  }
}
