import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmarks } from './bookmark.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateBookmarkDto } from './dto/create-bookmarks.dto';

@Injectable()
export class BookmarksService {
    constructor(
        @InjectRepository(Bookmarks)
        private readonly bookmarksRepository: Repository<Bookmarks>,
    ) { }

    async addBookmark(dto: CreateBookmarkDto) {
        try {
            const bookmark = this.bookmarksRepository.create(dto);
            const createdBookmark = await this.bookmarksRepository.save(bookmark);
            return createdBookmark;
        } catch (error) {
            console.log(error);
        }
    }
    async getBookmarks() {
        try {
            const bookmarks = this.bookmarksRepository.find();
            return await bookmarks;
        } catch (err) { }
    }

    async getBookmark(id: number) {
        try {
            const bookmark = await this.bookmarksRepository.findOneBy({ id: id });

            return bookmark;
        } catch (err) {
            throw err;
        }
    }

    async updateBookmark(
        id: number,
        newData: CreateBookmarkDto,
    ): Promise<Bookmarks> {
        const bookmark = await this.bookmarksRepository.findOneBy({ id: id });
        if (!bookmark) {
            throw new Error(`Bookmark with ID ${id} not found`);
        }
        Object.assign(bookmark, newData);

        await this.bookmarksRepository.save(bookmark);

        return bookmark;
    }

    async deleteBookmark(id: number) {
        const bookmark = await this.bookmarksRepository.findOneBy({ id: id });
        if (!bookmark) {
            throw new Error(`Bookmark with ID ${id} not found`);
        }
        await this.bookmarksRepository.remove(bookmark);
    }
}
