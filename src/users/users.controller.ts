import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(Number(params.id), updateUserDto);
  }

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.all();
  }
}
