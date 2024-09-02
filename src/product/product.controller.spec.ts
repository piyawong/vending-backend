import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Product 1', price: 10.99 },
              { id: 2, name: 'Product 2', price: 20.99 },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                id,
                name: `Product ${id}`,
                price: id * 10.99,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((product: Product) =>
                Promise.resolve({ id: Date.now(), ...product }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: number, product: Product) =>
                Promise.resolve({ id, ...product }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await controller.findOne('1');
      expect(result).toHaveProperty('id', 1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        price: 15.99,
      };
      const result = await controller.create(newProduct as Product);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', 'New Product');
      expect(result).toHaveProperty('price', 15.99);
      expect(service.create).toHaveBeenCalledWith(newProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updatedProduct = {
        name: 'Updated Product',
        price: 25.99,
      };
      const result = await controller.update('1', updatedProduct as Product);
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('name', 'Updated Product');
      expect(result).toHaveProperty('price', 25.99);
      expect(service.update).toHaveBeenCalledWith(1, updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
