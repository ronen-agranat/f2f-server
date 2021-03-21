import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtRefreshGuard } from './auth/jwt-refresh.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  // TODO: Move to a new 'authentication' controller
  // Given a username and password, generate new access and refresh tokens
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const { user } = req;

    // https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    await this.usersService.setCurrentRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Given a refresh token, generate a new access token
  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  async refresh(@Request() req) {
    const { user } = req;

    const accessToken = await this.authService.generateAccessToken(user);

    return { accessToken };
  }
}