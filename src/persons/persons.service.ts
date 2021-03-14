import { ForbiddenException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto} from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  create(personDto: CreatePersonDto, userId: number): Promise<Person> {
    const person = new Person();
    person.name = personDto.name;
    person.role = personDto.role;
    person.imageUrl = personDto.imageUrl;
    person.phone = personDto.phone;
    person.team = personDto.team;

    // Associate person with logged-in user
    person.userId = userId;

    return this.personRepository.save(person);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto, userId: number): Promise<Person> {
    const person = await this.personRepository.findOne(id);

    // User can only update persons associated with them
    if (person.userId !== userId) {
      throw new ForbiddenException();
    }

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

  all(userId: number): Promise<Person[]> {
    // Results for logged-in user only
    return this.personRepository.find({where: { userId: userId } });
  }

  remove(personId: number, userId: number): Promise<DeleteResult> {
    // User can delete persons associated with them only
    return this.personRepository.delete({userId: userId, id: personId });
  }
}
