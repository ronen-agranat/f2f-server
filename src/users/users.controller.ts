import { Body, Controller, Get, Param, Post, Put, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // No authentication required to create user
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(Number(params.id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUsers(@Request() req): Promise<User[]> {
    // Admin permissions required to retrieve users list
    if (!req.user.isAdmin) {
      throw new ForbiddenException();
    }

    return this.userService.all();
  }
}
