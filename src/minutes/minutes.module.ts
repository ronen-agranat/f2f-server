import { Module } from '@nestjs/common';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Minutes } from './entities/minutes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Minutes])],
  controllers: [MinutesController],
  providers: [MinutesService],
})
export class MinutesModule {}
