import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { MinutesModule } from './minutes/minutes.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    PersonsModule,
    MinutesModule,
    TypeOrmModule.forRoot(DatabaseConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
