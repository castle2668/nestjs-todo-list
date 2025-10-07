import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { ParseIntPipe } from '../../pipes/parse-int/parse-int.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { ParseArrayPipe } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  @Get()
  getBooks(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return { ids };
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      book: 'Nest.js 入門',
      author: 'Sean',
    };
  }

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return dto;
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return { id, ...dto };
  }
}
