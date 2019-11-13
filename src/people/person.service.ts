import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto} from './dto/create-person.dto';

@Injectable()
export default class PersonService {
  private readonly people: Map<number, Person> = new Map<number, Person>();
  private maxId: number = 1;

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
