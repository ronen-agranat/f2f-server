import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinutesController } from './minutes/minutes.controller';

@Module({
  imports: [],
  controllers: [AppController, MinutesController],
  providers: [AppService],
})
export class AppModule {}
