import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.imageUrl = userDto.imageUrl;
    user.phone = userDto.phone;
    user.password = userDto.password;

    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    // TODO: hash password to find
    return this.userRepository.findOne({ where: { username: username }});
  }
}