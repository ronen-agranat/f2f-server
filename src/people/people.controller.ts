import { Controller, Get, Post, Param, Body } from '@nestjs/common';

interface IPerson {
  name: string;
  role: string;
  id: number;
}

@Controller('people')
export class PeopleController {
  people: Map<number, IPerson>;

  maxId: number;

  constructor() {
    const admin = require('firebase-admin');

    // TODO create generalised data-store interface and 2 implementations

    // In-memory client

    this.people = new Map<number, IPerson>();

    this.people.set(1,
      {
        id: 1,
        name: 'Quentin Dale',
        role: 'Senior data scientist',
      },
    );

    this.maxId = 1;
  }

  @Get(':id')
  detailsForPerson(@Param() params): IPerson {
    return this.people.get(Number(params.id));
  }
}
