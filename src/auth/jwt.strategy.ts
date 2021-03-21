import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';


@Injectable()
// TODO: How does this strategy end up getting named 'jwt' so that it is accessible as such from the guard?
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    // JWT extraction is handled for us
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // FIXME: Why is access token secret specified in so many places?
      secretOrKey: jwtConstants.accessTokenSecret
    });
  }

  async validate(payload: any) {
    // Payload is guaranteed to be valid, issued token at this point.
    // sub: short for 'subject'; refers to user id.
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;  }
}