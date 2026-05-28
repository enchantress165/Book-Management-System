
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';


import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }

 @Get('/search/:title')
  searchBook(
    @Param('title') title: string,
  ) {
    return this.bookService.searchBook(
      title,
    );
  }

  @Get('/category/:category')
  filterByCategory(
    @Param('category')
    category: string,
  ) {
    return this.bookService.filterByCategory(
      category,
    );
  }

  @Patch(':id/borrow')
  borrowBook(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookService.borrowBook(id);
  }

  @Patch(':id/return')
  returnBook(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookService.returnBook(id);
  }


}



// import {Controller, Get, Post, Patch, Delete, Param, Body,} from '@nestjs/common';

// @Controller('books')
// export class BookController {

//   @Get()
//   findAll() {
//     return 'Get all books';
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return `Get book with id ${id}`;
//   }

//   @Post()
//   create(@Body() body: any) {
//     return body;
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() body: any,
//   ) {
//     return `Update book ${id}`;
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return `Delete book ${id}`;
//   }
// }