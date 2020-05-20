import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
// import { validatePassword } from 'strapi-plugin-users-permissions/services/user';
import { compareSync } from 'bcryptjs';

const validatePassword = (password, hash) => compareSync(password, hash);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login() {
    const payload = { username: 'Yongjun' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async index(token) {
    return this.jwtService.verify(token);
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Users | undefined> {
    const user = await this.usersService.findOne(username);
    if (user && validatePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }
}
