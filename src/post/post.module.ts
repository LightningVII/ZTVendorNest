import { Module, HttpModule } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UploadFileService } from '../upload-file/upload-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from '../upload-file/upload-file.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadFile]),
    TypeOrmModule.forFeature([Users]),
    HttpModule,
  ],
  controllers: [PostController],
  providers: [PostService, UploadFileService],
})
export class PostModule {}
