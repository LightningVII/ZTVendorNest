import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AuthModule } from './auth/auth.module';
import { ExcelModule } from './excel/excel.module';
import * as path from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 27017,
      // username: '',
      // password: '',
      database: path.resolve(process.env.PWD, '../ZTVendorStrapi/.tmp/data.db'),
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
      // synchronize: true,
      // useUnifiedTopology: true,
      logging: true,
    }),
    PostModule,
    UploadFileModule,
    AuthModule,
    UsersModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
