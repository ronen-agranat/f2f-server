import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CryptConstants } from '../crypt/constants';
import { jwtConstants } from 'src/auth/constants';
import { Person } from 'src/persons/entities/person.entity';

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
    delete newUser.currentHashedRefreshToken;
    return newUser;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`No user with id ${id}`);
    }

    // Hashed password never leaves here
    delete user.hashedPassword;
    delete user.currentHashedRefreshToken;
    return user;
  }

  async validateUser(username: string, givenPassword: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (user) {
      const passwordsMatch = await bcrypt.compare(givenPassword, user.hashedPassword);

      if (passwordsMatch) {
        delete user.hashedPassword;
        delete user.currentHashedRefreshToken;

        return user;
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // TODO: Consider user repository update() method

    const user = await this.userRepository.findOne(id);

    if (user) {
      // FIXME: Similar and repeated code to the above
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.imageUrl = updateUserDto.imageUrl;
      user.phone = updateUserDto.phone;
      
      const savedUser = await this.userRepository.save(user);

      delete savedUser.hashedPassword;
      delete savedUser.currentHashedRefreshToken;

      return savedUser;
    }
  }

  async setCurrentRefreshToken(userId: number, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, CryptConstants.saltRounds);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken
    });
  }

  async getUserIfRefreshTokenMatches(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user) { throw new NotFoundException(); }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

    if (isRefreshTokenMatching) { return user; }

    // Return nothing
  }

  async all(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      delete user.hashedPassword;
      delete user.currentHashedRefreshToken;
      
      return user;
    });
  }
}