// 

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PlaceBidDto } from './dto/place-bid.dto';

@Injectable()
export class BookService {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(
      book => book.id === id,
    );

    if (!book) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    return book;
  }

  create(
    createBookDto: CreateBookDto,
  ): Book {
    const existingBook = this.books.find(
      book =>
        book.title === createBookDto.title &&
        book.author === createBookDto.author,
    );

    if (existingBook) {
      throw new BadRequestException(
        'Book already exists',
      );
    }

    const newBook: Book = {
      id: Date.now(),

      available: true,

      currentBid: 0,
      highestBidder: null,
      biddingActive: false,

      ...createBookDto,
    };

    this.books.push(newBook);

    return newBook;
  }

  update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Book {
    const book = this.findOne(id);

    Object.assign(book, updateBookDto);

    return book;
  }

  remove(id: number): string {
    const index = this.books.findIndex(
      book => book.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    this.books.splice(index, 1);

    return 'Book deleted successfully';
  }

  searchBook(title: string): Book[] {
    return this.books.filter(book =>
      book.title
        .toLowerCase()
        .includes(title.toLowerCase()),
    );
  }

  filterByCategory(
    category: string,
  ): Book[] {
    return this.books.filter(
      book =>
        book.category.toLowerCase() ===
        category.toLowerCase(),
    );
  }

  borrowBook(id: number): Book {
    const book = this.findOne(id);

    if (!book.available) {
      throw new BadRequestException(
        'Book already borrowed',
      );
    }

    book.available = false;

    return book;
  }

  returnBook(id: number): Book {
    const book = this.findOne(id);

    if (book.available) {
      throw new BadRequestException(
        'Book already returned',
      );
    }

    book.available = true;

    return book;
  }

  startBidding(id: number): Book {
    const book = this.findOne(id);

    book.biddingActive = true;

    return book;
  }

  placeBid(
    id: number,
    placeBidDto: PlaceBidDto,
  ): Book {
    const book = this.findOne(id);

    if (!book.biddingActive) {
      throw new BadRequestException(
        'Bidding not active',
      );
    }

    if (
      placeBidDto.amount <=
      book.currentBid
    ) {
      throw new BadRequestException(
        'Bid amount must be higher',
      );
    }

    book.currentBid =
      placeBidDto.amount;

    book.highestBidder =
      placeBidDto.bidderName;

    return book;
  }

  endBidding(id: number): Book {
    const book = this.findOne(id);

    book.biddingActive = false;

    return book;
  }

  getHighestBid(id: number) {
    const book = this.findOne(id);

    return {
      title: book.title,
      currentBid: book.currentBid,
      highestBidder:
        book.highestBidder,
    };
  }


}