import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto} from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

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
    person.imageUrl = personDto.imageUrl;
    person.phone = personDto.phone;
    person.team = personDto.team;

    return this.personRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.personRepository.findOne(id);
    // FIXME: Similar and repeated code to the above
    person.name = updatePersonDto.name;
    person.role = updatePersonDto.role;
    person.imageUrl = updatePersonDto.imageUrl;
    person.phone = updatePersonDto.phone;
    person.team = updatePersonDto.team;
    return this.personRepository.save(person);
  }

  find(id: number): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  all(): Promise<Person[]> {
    return this.personRepository.find();
  }

  remove(id: number): Promise<DeleteResult> {
    return this.personRepository.delete(id);
  }
}
