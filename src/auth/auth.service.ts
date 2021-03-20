import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<User> {
    return this.usersService.validateUser(username, password);
  }

  // Generate new JWT access token
  async generateAccessToken(user: User) {
    // Payload contains claims about the user we want to verify.
    // `sub` is short for `subject` (JWT is meant to be short) and is the id.
    const payload = {
      username: user.username,
      sub: user.id,
      name: user.name,
      isAdmin: user.isAdmin
    };
    // Config here is set when JwtService is created.
    // TODO: Rather specify config here at the callsite, as below

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: jwtConstants.accessTokenExpiresIn
    });
  }

  // Generate new JWT refresh token
  async generateRefreshToken(user: User) {
    // Payload contains claims about the user we want to verify.
    // `sub` is short for `subject` (JWT is meant to be short) and is the id.
    const payload = {
      username: user.username,
      sub: user.id,
      name: user.name,
      isAdmin: user.isAdmin
    };
    // Config here is set when `sign` function is called

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: jwtConstants.refreshTokenExpiresIn
    });
  }
}