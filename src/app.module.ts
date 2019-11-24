import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { MinutesModule } from './minutes/minutes.module';

@Module({
  imports: [PersonsModule, MinutesModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
