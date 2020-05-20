import { Controller, Body, Headers, Post, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { UploadFileService } from '../upload-file/upload-file.service';
import { ObjectID as ObjID } from 'mongodb';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadFileService: UploadFileService,
  ) {}
  /* @Post('store')
  async store(@Body() data, @Headers('authorization') token) {
    const ref = await this.postService.checkAuthorization(token);
    if (ref) {
      const post = await this.postService.store({
        ...data,
        ref,
      });
      const file = await this.uploadFileService.index(data.ref);
      console.log('token :', file);
      return await this.uploadFileService.insertRelated(data.ref, post);
    }
    return false;
  } */

  @Post()
  async test(@Body() data) {
    const test = await this.postService.test(data);
    return await this.uploadFileService.insertRelated(
      new ObjID('5dde236533b39d0cfd4dda95'),
      test,
    );
    // .update({id:2},{name:'李四'})
  }
}
