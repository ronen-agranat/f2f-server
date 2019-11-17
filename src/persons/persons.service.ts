import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

    return this.personRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const personToUpdate = await this.personRepository.findOne(updatePersonDto.id);
    personToUpdate.name = updatePersonDto.name;
    personToUpdate.role = updatePersonDto.role;
    personToUpdate.imageUrl = updatePersonDto.imageUrl;
    return this.personRepository.save(personToUpdate);
  }

  find(id: number): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  all(): Promise<Person[]> {
    return this.personRepository.find();
  }
}
