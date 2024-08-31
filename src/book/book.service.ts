import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  create(name: string): Promise<Book> {
    const newBook = this.bookRepository.create({ name });
    return this.bookRepository.save(newBook);
  }

  async update(id: number, name: string): Promise<Book> {
    await this.bookRepository.update(id, { name });
    return this.bookRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
