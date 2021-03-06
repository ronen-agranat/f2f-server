import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CryptConstants } from '../crypt/constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    // Compare incoming plaintext password with stored hashed password using bcrypt
    const passwordsMatch = await bcrypt.compare(pass, user.hashedPassword);

    if (user && passwordsMatch) {
      // Strip hashed password from user object then return it
      const { hashedPassword, ...result } = user;
      return result;
    }
    // You leave... with nothing.
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}