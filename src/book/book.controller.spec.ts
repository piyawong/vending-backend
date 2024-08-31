import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
// import { Book } from './book.entity';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Book 1' },
              { id: 2, name: 'Book 2' },
            ]),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve({ id, name: `Book ${id}` }),
              ),
            create: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ id: Date.now(), name }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: number, name: string) =>
                Promise.resolve({ id, name }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await bookController.findAll();
      expect(result).toHaveLength(2);
      expect(bookService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const result = await bookController.findOne('1');
      expect(result).toEqual({ id: 1, name: 'Book 1' });
      expect(bookService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const newBook = 'New Book';
      const result = await bookController.create(newBook);
      expect(result.name).toBe(newBook);
      expect(bookService.create).toHaveBeenCalledWith(newBook);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updatedBook = 'Updated Book';
      const result = await bookController.update('1', updatedBook);
      expect(result).toEqual({ id: 1, name: updatedBook });
      expect(bookService.update).toHaveBeenCalledWith(1, updatedBook);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      await bookController.remove('1');
      expect(bookService.remove).toHaveBeenCalledWith(1);
    });
  });
});
