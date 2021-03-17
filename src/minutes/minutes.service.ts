import { Injectable } from '@nestjs/common';
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

  async create(personId: number, minutesDto: CreateMinutesDto): Promise<Minutes> {
    const minutes = new Minutes();
    minutes.newBusiness = minutesDto.newBusiness;
    minutes.nextTime = minutesDto.nextTime;
    minutes.followUps = minutesDto.followUps;
    minutes.date = minutesDto.date;
    minutes.person = personId as any;

    return this.minutesRepository.save(minutes);
  }

  async update(id: number, minutesDto: UpdateMinutesDto): Promise<Minutes> {
    const minutes = await this.minutesRepository.findOne(minutesDto.id);
    minutes.newBusiness = minutesDto.newBusiness;
    minutes.nextTime = minutesDto.nextTime;
    minutes.followUps = minutesDto.followUps;
    minutes.date = minutesDto.date;
    return this.minutesRepository.save(minutes);
  }

  findOne(id: number): Promise<Minutes> {
    return this.minutesRepository.findOne(id);
  }

  findAllForPerson(personId: number): Promise<Minutes[]> {
    // Fetch minutes for person with minutes ordered by created date.
    // Wow, this is not pretty.
    // This is the best way to query a relation and have the relation be sorted.
    // Feature request open here: https://github.com/typeorm/typeorm/issues/2620
    return this.minutesRepository.createQueryBuilder('minutes')
      .leftJoinAndSelect(
        "minutes",
        "minutes.person",
        "minutes.person.id = :personId",
        { personId }
      )
      .orderBy({
          'minutes.createdAt': 'DESC',
      })
      .getMany();
  }

  // Add follow-ups to the latest minutes for the person
  async appendFollowUps(personId: number, text: string): Promise<Minutes> {
    // Find most recent minutes
    const minutes = await this.minutesRepository.findOne({
      where: {
        personId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // Bail out if no minutes found
    if (!minutes) { return null; }

    // Append text to follow-ups
    minutes.followUps = minutes.followUps + '\n' + text;

    // Save and return value
    return this.minutesRepository.save(minutes);
  }

  // Add follow-ups to the latest minutes for the person
  async appendNextTime(personId: number, text: string): Promise<Minutes> {
    // Find most recent minutes
    const minutes = await this.minutesRepository.findOne({
      where: {
        personId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    // Bail out if no minutes found
    if (!minutes) { return null; }

    // Append text to next time
    minutes.nextTime = minutes.nextTime + '\n' + text;

    // Save and return value
    return this.minutesRepository.save(minutes);
  }

  all(): Promise<Minutes[]> {
    return this.minutesRepository.find();
  }
}
