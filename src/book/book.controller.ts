import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(+id);
  }

  @Post()
  create(@Body('name') name: string): Promise<Book> {
    return this.bookService.create(name);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('name') name: string): Promise<Book> {
    return this.bookService.update(+id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(+id);
  }
}
