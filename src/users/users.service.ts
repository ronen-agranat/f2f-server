import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CryptConstants } from '../crypt/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    const plaintextPassword = userDto.password;

    user.username = userDto.username;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.imageUrl = userDto.imageUrl;
    user.phone = userDto.phone;
    user.email = userDto.email;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(plaintextPassword, CryptConstants.saltRounds);

    user.hashedPassword = hashedPassword;

    // Create new user record
    const newUser = await this.userRepository.save(user);

    // Blank out hashed password before returning created record
    newUser.hashedPassword = '';

    return newUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username }});
  }

  async all(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      // Blank out hashed passwords
      user.hashedPassword = '';
      return user;
    });
  }
}