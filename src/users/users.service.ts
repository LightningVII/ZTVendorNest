import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<Users | undefined> {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: string): Promise<Users | undefined> {
    return await this.userRepository.findOne(id);
  }
}
