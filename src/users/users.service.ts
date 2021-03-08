import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CryptConstants } from '../crypt/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    const plaintextPassword = userDto.password;

    user.username = userDto.username;
    user.name = userDto.name;
    user.imageUrl = userDto.imageUrl;
    user.phone = userDto.phone;
    user.email = userDto.email;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(plaintextPassword, CryptConstants.saltRounds);

    user.hashedPassword = hashedPassword;

    // Create new user record
    const newUser = await this.userRepository.save(user);

    // Hashed password never leaves here
    delete newUser.hashedPassword;
    return newUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username: username }});

    // Hashed password never leaves here
    delete user.hashedPassword
    return user;
  }

  async validateUser(username: string, givenPassword: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (user) {
      const passwordsMatch = await bcrypt.compare(givenPassword, user.hashedPassword);

      if (passwordsMatch) {
        delete user.hashedPassword;
        return user;
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (user) {
      // FIXME: Similar and repeated code to the above
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.imageUrl = updateUserDto.imageUrl;
      user.phone = updateUserDto.phone;
      
      const savedUser = await this.userRepository.save(user);

      delete savedUser.hashedPassword;
      return savedUser;
    }
  }

  async all(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      delete user.hashedPassword;
      return user;
    });
  }
}