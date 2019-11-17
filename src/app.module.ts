import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinutesController } from './minutes/minutes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [PersonsModule, TypeOrmModule.forRoot()],
  controllers: [AppController, MinutesController],
  providers: [AppService],
})
export class AppModule {}
