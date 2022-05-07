import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Product',
      stock: 10,
      image: 'https://picsum.photos/id/1/200/300',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Product',
      stock: 20,
      image: 'https://picsum.photos/id/2/200/300',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(filter?: { limit: number; offset: number; brand: string }): any {
    return this.products;
  }

  findOne(id: number): any {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const product = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(product);
    return product;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);
    console.log(product);
    if (product) {
      const index = this.products.findIndex((p) => p.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return product;
    }
    return null;
  }

  delete(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    return { message: `producto ${id} eliminado` };
  }
}
