import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private readonly uploadFileRepository: Repository<UploadFile>,
  ) {}

  async index(id) {
    return await this.uploadFileRepository.findOne(id);
  }
  async insertRelated(id, data) {
    const file = await this.uploadFileRepository.findOne(id);
    console.log('file :', file);
    await this.uploadFileRepository.update(
      { id },
      {
        name: '2.png',
        related: [...file.related, { kind: 'avatar' }],
      },
    );
    return { success: true };
  }
}
