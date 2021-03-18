import { Controller, Get, Post, Param, Body, Put, Request, UseGuards } from '@nestjs/common';
import { CreateMinutesDto } from './dto/create-minutes.dto';
import { UpdateMinutesDto } from './dto/update-minutes.dto';
import { AppendFollowUpsDto } from './dto/append-follow-ups.dto';
import { PersonsService } from '../persons/persons.service';
import { MinutesService } from './minutes.service';
import { Minutes } from './entities/minutes.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('persons')
export class MinutesController {
  constructor(private readonly minutesService: MinutesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':personId/minutes/:minutesId')
  findOne(@Request() req, @Param() params): Promise<Minutes> {
    const userId = Number(req.user.id);

    return this.minutesService.findOne(params.minutesId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':personId/minutes')
  findAll(@Request() req, @Param() params): Promise<Minutes[]> {
    const userId = Number(req.user.id);
  
    return this.minutesService.findAllForPerson(params.personId, userId);
  }

  @Post(':personId/minutes/latest/follow-ups/append')
  appendFollowUps(@Param() params, @Body() appendFollowUpsDto: AppendFollowUpsDto): Promise<Minutes> {
    return this.minutesService.appendFollowUps(Number(params.personId), appendFollowUpsDto.textToAppend);
  }

  @Post(':personId/minutes/latest/next-time/append')
  appendNextTime(@Param() params, @Body() appendFollowUpsDto: AppendFollowUpsDto): Promise<Minutes> {
    return this.minutesService.appendNextTime(Number(params.personId), appendFollowUpsDto.textToAppend);
  }

  @Put(':personId/minutes/:minutesId')
  updateMinutes(@Param() params, @Body() updateMinutesDto: UpdateMinutesDto): Promise<Minutes> {
    return this.minutesService.update(params.minutesId, updateMinutesDto);
  }

  @Post(':personId/minutes')
  create(@Param() params, @Body() createMinutesDto: CreateMinutesDto): Promise<Minutes> {
    return this.minutesService.create(Number(params.personId), createMinutesDto);
  }
}
