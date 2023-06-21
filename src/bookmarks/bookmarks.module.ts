import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmarks } from './bookmark.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bookmarks])],
  providers: [BookmarksService],
  controllers: [BookmarksController]
})
export class BookmarksModule {}
