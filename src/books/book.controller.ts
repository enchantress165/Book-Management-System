
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { CreateBookSchema, CreateBookDto, } from './dto/create-book.dto';
import { BookService } from './book.service';
//import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PlaceBidDto, PlaceBidSchema } from './dto/place-bid.dto';

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
create(@Body() body: unknown) {

  const validatedData =
    CreateBookSchema.parse(body);

  return this.bookService.create(
    validatedData,
  );
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

  @Patch(':id/start-bid')
  startBidding(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookService.startBidding(
      id,
    );
  }

  @Post(':id/bid')
placeBid(
  @Param('id', ParseIntPipe)
  id: number,

  @Body() body: unknown,
) {

  const validatedData =
    PlaceBidSchema.parse(body);

  return this.bookService.placeBid(
    id,
    validatedData,
  );
}

  @Patch(':id/end-bid')
  endBidding(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookService.endBidding(id);
  }

  @Get(':id/highest-bid')
  getHighestBid(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookService.getHighestBid(
      id,
    );
  }

}
