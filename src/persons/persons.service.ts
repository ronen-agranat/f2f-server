import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto} from './dto/create-person.dto';

@Injectable()
export default class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  create(personDto: CreatePersonDto): Promise<Person> {
    const person = new Person();
    person.name = personDto.name;
    person.role = personDto.role;

    return this.personRepository.save(person);
  }

  find(personId: number): Promise<Person> {
    return this.personRepository.findOne({id: personId});
  }
}
