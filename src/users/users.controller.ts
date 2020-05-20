import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findUsers(): Promise<Users[] | undefined> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id') id: string): Promise<Users | undefined> {
    return await this.userService.findById(id);
  }

  // @Get()
  // async getHello() {
  //   return await this.userService.index({ id: '5dd344c0a1225e379eeb1071' });
  // }

  @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthGuard('myjwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
