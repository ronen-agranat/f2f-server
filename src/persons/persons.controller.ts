import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus, UseGuards, Request, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPerson(@Request() req, @Body() createPersonDto: CreatePersonDto): Promise<Person> {
    const userId = Number(req.user.id);

    return this.personService.create(createPersonDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePerson(@Request() req, @Param() params, @Body() updatePersonDto: UpdatePersonDto): Promise<Person> {
    const userId = Number(req.user.id);

    return this.personService.update(Number(params.id), updatePersonDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOnePerson(@Request() req, @Param() params): Promise<Person> {
    const userId = Number(req.user.id);
    const personId = Number(params.id);

    // TODO: Move logic into PersonService

    const person = await this.personService.find(personId);

    // Users can ony view persons associated with them
    if (person.userId !== userId) {
      throw new ForbiddenException();
    }
    if (!person) {
      throw new NotFoundException(`No person with id ${personId}`);
    }
  
    return person;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllPersons(@Request() req, @Body() createPersonDto: CreatePersonDto): Promise<Person[]> {
    const userId = req.user.id;

    return this.personService.all(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removePerson(@Request() req, @Param() params): Promise<DeleteResult> {
    const userId = req.user.id;
    const personId = Number(params.id);

    return this.personService.remove(personId, userId);
  }
}
