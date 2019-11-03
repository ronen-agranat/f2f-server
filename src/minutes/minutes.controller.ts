import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateMinutesDto } from './create-minutes.dto';

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
    const admin = require('firebase-admin');

    // TODO create generalised data-store interface and 2 implementations

    // Firebase client

    // TODO: Generalise path to secrets file
    const serviceAccount = require('/Users/ragranat/face-to-face-firebase-key.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    db.collection('minutes').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch((err) => {
        console.log('Error getting documents from Firebase', err);
      });

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

  @Post(':id/minutes')
  create(@Param() params, @Body() createMinutesDto: CreateMinutesDto): object {
    this.peopleToMinutes.get(Number(params.id)).push({
      ...createMinutesDto,
      id: ++this.maxId,
    });
    return { id: this.maxId };
  }
}
