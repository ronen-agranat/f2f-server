import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinutesController } from './minutes/minutes.controller';
import { PeopleController } from './people/people.controller';

@Module({
  imports: [],
  controllers: [AppController, MinutesController, PeopleController],
  providers: [AppService],
})
export class AppModule {}
