import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local')
  @UseGuards(LocalAuthGuard)
  async local(@Request() req) {
    return req.user;
  }
  // @Get('login')
  // async login(@Request() req) {
  //   return await this.authService.login();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  async index() {
    return '1111';
  }
}
