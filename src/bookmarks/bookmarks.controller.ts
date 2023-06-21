import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmarks.dto';
import { Response } from 'express'; // Import Response from the correct package

@Controller('bookmarks')
export class BookmarksController {
    constructor(private bookmarkService: BookmarksService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async addBookmark(@Body() dto: CreateBookmarkDto, @Res() res: Response) {
        try {
            const bookmark = await this.bookmarkService.addBookmark(dto);
            res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                bookmark,
                message: 'Bookmark created successfully',
            });
        } catch (error) {
            throw error;
        }
    }
    @Get()
    async getBookmarks(@Res() res: Response) {
        try {
            const bookmarks = await this.bookmarkService.getBookmarks();
            res.json({
                statusCode: HttpStatus.OK,
                bookmarks,

            });
        } catch (err) {
            throw err;
        }
    }
    @Get("/:id")
    async getBookmark(@Param('id') id: number, @Res() res: Response) {
        try {
            const bookmark = await this.bookmarkService.getBookmark(id);
            res.json({
                statusCode: HttpStatus.OK,
                bookmark
            })
        } catch (err) {
            throw err;
        }
    }

    @Patch("/:id")
    async updateBookmark(@Body() dto: CreateBookmarkDto, @Param("id") id: number, @Res() res: Response) {
        try {
            const bookmark = await this.bookmarkService.updateBookmark(id, dto);
            res.json({
                statusCode: HttpStatus.OK,
                bookmark,
            });
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async deleteBookmark(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const bookmarkId = parseInt(id, 10);
        await this.bookmarkService.deleteBookmark(bookmarkId);
        res.json({
            statusCode: HttpStatus.OK,
            message: "Bookmark deleted successfully"
        })
    }

}
