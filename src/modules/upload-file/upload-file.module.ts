import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './upload-file.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
