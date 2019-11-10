import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { CreateMinutesDto } from './create-minutes.dto';
import { UpdateMinutesDto } from './update-minutes.dto';

interface IMinutes {
  id: number;
  date: string;
  newBusiness: string;
  followUps: string;
  nextTime: string;
}

@Controller('people')
export class MinutesController {
  peopleToMinutes: Map<number, IMinutes[]>;

  maxId: number;

  constructor() {
    // In-memory client

    this.peopleToMinutes = new Map<number, IMinutes[]>();

    this.peopleToMinutes.set(1, [
      {
        id: 1,
        date: '18 October 2019',
        newBusiness: 'New business goes here',
        followUps: 'Follow ups go here',
        nextTime: 'Next time goes here',
      },
    ]);

    this.maxId = 1;
  }

  @Get(':id/minutes')
  allMinutesForPerson(@Param() params): IMinutes[] {
    return this.peopleToMinutes.get(Number(params.id));
  }

  // TODO: need strong validation for params
  @Put(':personId/minutes/:minutesId')
  updateMinutes(@Param() params, @Body() updateMinutesDto: UpdateMinutesDto): void {
    const minutes = this.peopleToMinutes.get(Number(params.personId));

    const newMinutes = minutes.map((minute) => {
      if (minute.id === Number(params.minutesId)) {
        return updateMinutesDto;
      } else {
        return minute;
      }
    });

    this.peopleToMinutes.set(Number(params.personId), newMinutes);
  }

  @Post(':id/minutes')
  create(@Param() params, @Body() createMinutesDto: CreateMinutesDto): UpdateMinutesDto {
    const newMinutes: IMinutes = {
      ...createMinutesDto,
      id: ++this.maxId,
    };

    this.peopleToMinutes.get(Number(params.id)).unshift(newMinutes);

    // Return full object including id
    return newMinutes;
  }
}
