import { Injectable } from '@nestjs/common';

import Person from './interfaces/person.interface';

export default class PersonService {
  private readonly people: Map<number, Person> = new Map<number, Person>();
  private maxId: number = 1;

  constructor() {
    this.people.set(1,
      {
        id: 1,
        name: 'Quentin Dale',
        role: 'Senior data scientist',
      },
    );
  }

  find(personId: number): Person {
    return this.people.get(personId);
  }
}
