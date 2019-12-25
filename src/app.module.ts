import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { UploadFileModule } from './modules/upload-file/upload-file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      database: 'strapi-server',
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      logging: true,
    }),
    PostModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
