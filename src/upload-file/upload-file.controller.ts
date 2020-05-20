import { Controller, Get, Query } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Get()
  async index(@Query() data) {
    return await this.uploadFileService.index(data);
  }
}

/* import { Controller, Body, Post, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async store(@Body() data) {
    return await this.postService.store(data);
  }
} */
