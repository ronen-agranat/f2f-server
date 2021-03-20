import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Minutes } from './entities/minutes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMinutesDto } from './dto/create-minutes.dto';
import { UpdateMinutesDto } from './dto/update-minutes.dto';
import { Person } from 'src/persons/entities/person.entity';

@Injectable()
export class MinutesService {
  constructor(
    @InjectRepository(Minutes)
    private readonly minutesRepository: Repository<Minutes>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>
  ) {}

  async create(personId: number, minutesDto: CreateMinutesDto, userId: number): Promise<Minutes> {
    const minutes = new Minutes();

    const person = await this.personRepository.findOne(personId);

    if (person.userId !== userId) {
      throw new ForbiddenException();
    }

    minutes.newBusiness = minutesDto.newBusiness;
    minutes.nextTime = minutesDto.nextTime;
    minutes.followUps = minutesDto.followUps;
    minutes.date = minutesDto.date;
    minutes.person = person;

    return this.minutesRepository.save(minutes);
  }

  async update(id: number, minutesDto: UpdateMinutesDto, userId: number): Promise<Minutes> {
    // TODO: Consider user repository update() method

    const minutes = await this.minutesRepository.findOne({
      where: { id: minutesDto.id },
      relations: ['person']
    });

    if (minutes.person.userId !== userId) {
      throw new ForbiddenException();
    }

    minutes.newBusiness = minutesDto.newBusiness;
    minutes.nextTime = minutesDto.nextTime;
    minutes.followUps = minutesDto.followUps;
    minutes.date = minutesDto.date;

    return this.minutesRepository.save(minutes);
  }

  async findOne(id: number, userId: number): Promise<Minutes> {
    const minutes = await this.minutesRepository.findOne(id);

    // Cannot query minutes for another user
    if (minutes.person.userId != userId) {
      throw new ForbiddenException();
    }

    return minutes;
  }

  async findAllForPerson(personId: number, userId: number): Promise<Minutes[]> {
    // Fetch minutes for person with minutes ordered by created date.
    // Wow, this is not pretty.
    // This is the best way to query a relation and have the relation be sorted.
    // Feature request open here: https://github.com/typeorm/typeorm/issues/2620
    const minutes = await this.minutesRepository.createQueryBuilder('minutes')
      .leftJoinAndSelect(
        "minutes.person",
        "person"
      )
      .where("person.id = :personId", { personId })
      // Load minutes only for people belonging to this user
      .andWhere("person.userId = :userId", { userId })
      .orderBy({
          'minutes.createdAt': 'DESC',
      })
      .getMany();

    return minutes;
  }

  // Add follow-ups to the latest minutes for the person
  async appendFollowUps(personId: number, text: string, userId: number): Promise<Minutes> {
    // Find most recent minutes
    const minutes = await this.minutesRepository.findOne({
      relations: ['persons'],
      where: {
        personId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // Bail out if no minutes found
    if (!minutes) { return null; }

    if (minutes.person.userId !== personId) {
      throw new ForbiddenException();
    }

    // Append text to follow-ups
    minutes.followUps = minutes.followUps + '\n' + text;

    // Save and return value
    return this.minutesRepository.save(minutes);
  }

  // Add follow-ups to the latest minutes for the person
  async appendNextTime(personId: number, text: string, userId: number): Promise<Minutes> {
    // Find most recent minutes
    const minutes = await this.minutesRepository.findOne({
      relations: ['persons'],
      where: {
        personId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // Bail out if no minutes found
    if (!minutes) { return null; }

    if (minutes.person.userId !== personId) {
      throw new ForbiddenException();
    }

    // Append text to next time
    minutes.nextTime = minutes.nextTime + '\n' + text;

    // Save and return value
    return this.minutesRepository.save(minutes);
  }

  all(): Promise<Minutes[]> {
    return this.minutesRepository.find();
  }
}
