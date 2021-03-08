import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<User> {
    return this.usersService.validateUser(username, password);
  }

  async login(user: User) {
    // Payload contains claims about the user we want to verify.
    // `sub` is short for `subject` (JWT is meant to be short) and is the id.
    const payload = { username: user.username, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}