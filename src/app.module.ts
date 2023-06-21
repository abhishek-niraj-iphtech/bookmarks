import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { Bookmarks } from './bookmarks/bookmark.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Bookmarks],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    BookmarksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
